import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import { StartUseCase } from "./useCases/game/start/startUseCase";
import mongoose from "mongoose";
import { MoveUseCase } from "./useCases/game/move/moveUseCase";
import { OverUseCase } from "./useCases/game/over/overUseCase";
import { PlayAgainUseCase } from "./useCases/game/playAgain/playAgainUseCase";


dotenv.config()

const uri = process.env.MONGO_DB_URL
if (!uri) {
    console.error('connection with database failed')
    throw new Error('connection with database failed')
}

mongoose.connect(uri, ()=> {
  const httpServer = createServer()
  const startUseCase = new StartUseCase()
  const moveUseCase = new MoveUseCase()
  const overUseCase = new OverUseCase()
  const playAgainUseCase = new PlayAgainUseCase()
  
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
  
  
  
  io.on("connection", async (socket: Socket) => {
    console.log(`${socket.id} is connected`)
    const game = await startUseCase.execute(socket.id)

    game.players?.forEach(data => {
      // console.log('=> emiting to', data.id)
      io.to(data.id).emit('startGame', game)
    })

    socket.on('playAgain', async (value) => {
      const response = await playAgainUseCase.execute(value)
      response.players?.forEach(data => {
        io.to(data.id).emit('restart', response)
      })
    })
  
    socket.on('play', async (value) => {
      // console.log(value)
      const response = await moveUseCase.execute(value)

      if (response) {
        if (typeof response === 'string') {
          socket.emit('changeState', response)
        } else {
          const over = await overUseCase.execute(response)
          response.players?.forEach(data => {
            // console.log('=> emiting to', data.id)
            io.to(data.id).emit('changeState', response)
            io.to(data.id).emit('gameOver', over)
          })

          

        }        
      }
    })
  
    socket.on('disconnect', () => {
      console.log('disconnect', socket.id)
    })
  })
  
  httpServer.listen(8080, () => {
      console.log('here we are')
  });
})


