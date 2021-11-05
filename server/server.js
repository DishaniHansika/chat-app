const express=require("express");
const app=express();
const cors = require('cors');
const httpServer =require("http").createServer();
const io = require("socket.io")(httpServer,{
  cors: {
    origin: "*",
    methods:["GET","POST"]
  }
});
const PORT=7000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

app.use(cors());
app.use('/', (req, res) => {
  res.send({token:'123'});
});

io.on("connection", (socket) => {
  console.log("Connected to Socket Id: " + socket.id)

  // Join a conversation
  const { groupId } = socket.handshake.query;
  socket.join(groupId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(groupId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    console.log(data);
  });
  socket.on("disconnect",()=>{
    socket.leave(groupId);
    console.log(`Socket Id ${socket.id} disconnected`);
  });
});

httpServer.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
});

app.listen(8080, () => console.log('API is running on http://localhost:8080'));
