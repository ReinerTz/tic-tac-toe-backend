import { OverService } from "../../../service/game/over/over.service";
import { GameStatusEnum } from "../../../shared/enums/Game.enum";
import { GameInterface, GameOverInterface } from "../../../shared/interfaces/Game.interface";
import { PlayerInterface } from "../../../shared/interfaces/Player.interface";

export class OverUseCase {

    private service: OverService

    constructor() {
        this.service = new OverService()
    }

    async execute(game: GameInterface): Promise<GameOverInterface> {
        const winner = this.winner(game.squares)
        
        if (winner && game.players) {
            const playerIndex = game.players?.findIndex(player => player.character === winner)
            game.status = GameStatusEnum.OVER
            game.players[playerIndex].score += 1

            console.log('game over')

            await this.service.updateGame(game)

            return {
                over: true,
                winner: game.players[playerIndex as number],
            }
        }

        return {
            over: false
        }
    }

    winner(squares: string[]): string {

        let win = ''

        if (((squares[0] === squares[1]) && (squares[1] === squares[2])) || 
            ((squares[0] === squares[4]) && (squares[4] === squares[8])) &&
            ((squares[0] === squares[3]) && (squares[3] === squares[6]))) {
            win = squares[0]
        }

        if ((squares[1] === squares[4]) && (squares[4] === squares[7])) {
            win = win ? win : squares[1]
        }

        if (((squares[2] === squares[5]) && (squares[5] === squares[8])) || 
            ((squares[2] === squares[4]) && (squares[4] === squares[6]))) {
            win = win ? win : squares[2]
        }

        if ((squares[3] === squares[4]) && (squares[4] === squares[5])){
            win = win ? win : squares[3]
        }

        if ((squares[6] === squares[7]) && (squares[7] === squares[8])){
            win = win ? win : squares[6]
        }
        
        return win
    }


}