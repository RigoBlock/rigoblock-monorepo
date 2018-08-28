import fetch from 'node-fetch'

class Prova {
  public getData(base, quote) {
    console.log(arguments)
    return true
  }
}

const asd = new Prova()

asd.getData(1, 2)
