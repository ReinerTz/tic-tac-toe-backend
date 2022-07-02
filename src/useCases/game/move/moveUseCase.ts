import { MoveService } from "../../../service/game/move/move.service";
import { GameStatusEnum } from "../../../shared/enums/Game.enum";
import { GameInterface, MoveUseCaseParams } from "../../../shared/interfaces/Game.interface";

export class MoveUseCase {
    async execute({gameId, playerId, square} : MoveUseCaseParams): Promise<GameInterface | string> {
        const service = new MoveService()
        const game = await service.findGameAndValidatePlayer(gameId, playerId)
        
        if (!game) {            
            return 'Game doesnt exists'
        }

        if (game.lastMove?.id === playerId) {
            return 'Is not your turn to play'
        }

        if (game.squares[square] !== '') {
            return 'Square is not empty'
        }

        if (game.status !== GameStatusEnum.FULL) {
            return `Game with status ${game.status} cannot be played`
        }

        game.lastMove = game.players?.find(data => data.id === playerId)
        game.squares[square] = game.lastMove?.character as string 

        await service.updateGame(game)

        return game
    }
}