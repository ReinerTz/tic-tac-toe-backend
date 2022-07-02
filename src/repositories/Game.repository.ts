import { GameInterface, GameRepositoryInterface } from "../shared/interfaces/Game.interface";
import { GameInterfaceEntity, GameModel } from "../model/Game.model";
import { GameStatusEnum } from "../shared/enums/Game.enum";

export class GameRepository implements GameRepositoryInterface {
    async findAndUpdateGame(game: GameInterface): Promise<GameInterface> {
        const { squares, id, status, lastMove, players} = game

        const response = await GameModel.findOneAndUpdate( { id }, { squares, status, lastMove, players })

        if (!response) {
            throw new Error(`It was not possible to findAndUpdate item id: ${id}`)
        }

        return response
    }

    async createGame(game: GameInterface): Promise<GameInterface> {
        const entity = new GameModel({
            ...game
        })
        const response = await entity.save()

        // console.log('=> Game created', response)

        return response
    }

    async findById(id: string): Promise<GameInterface | null> {
        const response = await GameModel.findOne({ id })

        // console.log('=> Game find by id', response)

        return response 
    }

    async findByStatus(status: GameStatusEnum): Promise<GameInterface | null> {
        const response = await GameModel.find( { status } )

        // console.log('=> Game find by status', response)

        if (!response || response.length <= 0) {
            return null
        } 

        return response[0]
    }
}