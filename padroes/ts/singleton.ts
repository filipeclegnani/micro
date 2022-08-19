export class MyDatabase {
  private static _instance?: MyDatabase
  private user?: string
  private password?: string
  private port?: number
  private address?: string
  private connection: string = 'Disconnected'

  private constructor() {}

  static get instance(): MyDatabase {
    if (!MyDatabase._instance) {
      MyDatabase._instance = new MyDatabase()
    }

    return MyDatabase._instance
  }

  public connect(
    user: string,
    password: string,
    port: number,
    address: string
  ) {
    this.user = user
    this.password = password
    this.port = port
    this.address = address
    this.connection = 'Connected'
  }

  public disconnect() {
    this.user = undefined
    this.password = undefined
    this.port = undefined
    this.address = undefined
    this.connection = 'Disconnected'
  }

  public getConnection() {
    return this.connection
  }

  public getConnectionInfo() {
    return {
      user: this.user,
      password: this.password,
      port: this.port,
      address: this.address,
    }
  }
}

const a = MyDatabase.instance
const b = MyDatabase.instance

console.log('1 ', a)
console.log('2 ', b)
console.log('3 ', a === b)

MyDatabase.instance.connect('user1', 'pass1', 1234, '127.0.0.1')

console.log('4 ', MyDatabase.instance)
console.log('5 ', MyDatabase.instance.getConnection())
console.log('6 ', MyDatabase.instance.getConnectionInfo())

MyDatabase.instance.connect('user2', 'pass2', 8080, '127.0.0.1')
console.log('7 ', MyDatabase.instance)
MyDatabase.instance.disconnect()
console.log('8 ', MyDatabase.instance)
