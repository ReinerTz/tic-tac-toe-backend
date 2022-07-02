import { StartService } from "../../../service/game/start/start.service";
import { GameStatusEnum } from "../../../shared/enums/Game.enum";
import { GameInterface } from "../../../shared/interfaces/Game.interface";
import { PlayerInterface } from "../../../shared/interfaces/Player.interface";

export class StartUseCase {
    async execute(playerId: string): Promise<GameInterface> {
        const service = new StartService()
        const game = await service.findOrCreateOpenGame()
        const players: PlayerInterface[] = game.players || []

        let character =  players.length > 0 ? 'X' : 'O'
        const player: PlayerInterface = {
            score: 0,
            id: playerId,
            character,
        }

        players.push(player)

        game.players = players

        if (players.length === 2) {
            game.status = GameStatusEnum.FULL
            game.lastMove = player
        }

        await service.updateGame({squares: game.squares, status: game.status, id: game.id, lastMove: game.lastMove, players: game.players})
        return game
    }

}