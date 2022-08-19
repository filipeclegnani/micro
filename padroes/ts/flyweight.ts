class Flyweight {
  private sharedState: any

  constructor(sharedState: any) {
    this.sharedState = sharedState
  }

  public operation(uniqueState: any): void {
    const s = JSON.stringify(this.sharedState)
    const u = JSON.stringify(uniqueState)
    console.log(
      `Flyweight: Mostrando estados compartilhados (${s}) e único (${u}).`
    )
  }
}

class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = <any>{}

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state)
    }
  }

  private getKey(state: string[]): string {
    return Buffer.from(state.join('_')).toString('base64')
  }

  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState)

    if (!(key in this.flyweights)) {
      console.log('FlyweightFactory: Criando um novo.')
      this.flyweights[key] = new Flyweight(sharedState)
    } else {
      console.log('FlyweightFactory: Reusando flyweight existente.')
    }

    return this.flyweights[key]
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length
    console.log(`\nFlyweightFactory: Contém ${count} flyweights`)
    for (const key in this.flyweights) {
      console.log(key)
    }
  }
}

const factory = new FlyweightFactory([
  ['Sansung', 'J5', 'pink'],
  ['Iphone', '11', 'black'],
  ['Iphone', '12', 'white'],
  ['Samsung', 'Galaxy Z flip', 'purple'],
  ['Samsung', 'Galaxy Z flip', 'white'],
])
factory.listFlyweights()

function addCellphone(
  ff: FlyweightFactory,
  owner: string,
  brand: string,
  model: string,
  color: string
) {
  console.log('\nClient: Adicionando ao banco.')
  const flyweight = ff.getFlyweight([brand, model, color])

  flyweight.operation([owner])
}

addCellphone(factory, 'James Doe', 'Xaiomi', 'POCO X3', 'blue')
addCellphone(factory, 'James Doe', 'Xaiomi', 'Redmi note 8', 'blue')

factory.listFlyweights()
