import cena1 from './cena1.js'
import cena2 from './cena2.js'

// Configurações iniciais do jogo
var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 570,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }, // Define a força da gravidade
debug: false,

            
        }
    },
    scene: [
        cena2,
        cena1
        
    ]
        
    
    
}

// Inicia o jogo com as configurações definidas
var game = new Phaser.Game(config);
// Declaração de variáveis todas
