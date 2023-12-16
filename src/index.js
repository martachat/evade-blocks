class Game {
  constructor() {
    this.player = null
    this.obstacles = []
  }

  start() {
    this.player = new Player()
    this.attachEventListeners()

    this.createObstacles()
    this.moveObstacles()
  }
  detectCollision(obstacle) {
    const playerRect = this.player.domElement.getBoundingClientRect()
  
    this.obstacles.forEach((obstacleInstance) => {
      const obstacleRect = obstacleInstance.domElement.getBoundingClientRect()
  
      if (
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top &&
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left
      ) {
        this.player.domElement.style.backgroundColor = 'blue'
        clearInterval(this.moveInterval)
        alert('You crashed')
        window.location.reload()
      }
    })
  }

  attachEventListeners() {
    window.addEventListener('keydown', (event) => {
      const input = event.key
      if (input === 'ArrowLeft' && this.player.positionX < 100) {
        this.player.moveLeft()
      } else if (input === 'ArrowRight') {
        this.player.moveRight()
      }
    })
  }

  moveObstacles() {
    this.moveInterval = setInterval(() => {
      this.obstacles.forEach((obstacle) => {
        obstacle.moveDown()
        this.detectCollision(obstacle)
      })
    }, 60)
  }

  createObstacles() {
    setInterval(() => {
      const obstacle = new Obstacle()
      this.obstacles.push(obstacle)
    }, 3000)
  }
}

class Player {
  constructor() {
    this.width = 10
    this.height = 5
    this.positionX = 50 - this.width / 2
    this.positionY = 0

    this.domElement = this.createPlayer()
  }

  createPlayer() {
    const nodeDOM = document.createElement('div')
    nodeDOM.id = 'player' 
    nodeDOM.style.width = `${this.width}vw`
    nodeDOM.style.height = `${this.height}vh`
    nodeDOM.style.bottom = this.positionY + 'vh'
    nodeDOM.style.left = `${this.positionX}vw`

    const board = document.getElementById('board')
    board.appendChild(nodeDOM)
    return nodeDOM
  }

  moveRight() {
    this.positionX += 1
    this.domElement.style.left = `${this.positionX}vw`
  }

  moveLeft() {
    this.positionX -= 1
    this.domElement.style.left = `${this.positionX}vw`
  }
}

class Obstacle {
  constructor() {
    this.width = 10
    this.height = 5
    this.positionX = Math.floor(Math.random() * (100 - this.width))
    this.positionY = 95 

    this.domElement = this.createElement()
  }

  createElement() {
    const obstacleDOM = document.createElement('div')
    obstacleDOM.className = 'obstacles'
    obstacleDOM.style.width = `${this.width}vw`
    obstacleDOM.style.height = `${this.height}vh`
    obstacleDOM.style.left = `${this.positionX}vw`
    obstacleDOM.style.bottom = `${this.positionY}vh`

    const board = document.getElementById('board')
    board.appendChild(obstacleDOM)
    return obstacleDOM
  }

  moveDown() {
    this.positionY -= 1
    this.domElement.style.bottom = `${this.positionY}vh`
  }
}

const game = new Game()
game.start()
