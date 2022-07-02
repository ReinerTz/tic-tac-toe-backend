import { PlayAgainService } from "../../../service/game/playAgain/playAgain.service"
import { GameStatusEnum } from "../../../shared/enums/Game.enum"
import { GameInterface } from "../../../shared/interfaces/Game.interface"

export class PlayAgainUseCase {
    private service: PlayAgainService
    
    constructor() {
        this.service = new PlayAgainService()
    }

    async execute(game: GameInterface): Promise<GameInterface> {
        game.squares = Array(9).fill('')
        game.status = GameStatusEnum.FULL
        await this.service.updateGame(game)
        return game
    }
}