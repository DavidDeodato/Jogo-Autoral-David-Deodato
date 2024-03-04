// Configurações iniciais do jogo
var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 590,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // Define a força da gravidade
            debug: true // Ativa o modo de depuração para física
        }
    },
    scene: {
        preload: preload, // Carrega recursos antes de iniciar
        create: create, // Cria elementos iniciais
        update: update, // Atualiza o jogo a cada quadro
    }
};

// Inicia o jogo com as configurações definidas
var game = new Phaser.Game(config);

// Declaração de variáveis todas
var blocomine; 
var nochao = false; 
var placar = 0; 

// Variável para armazenar o objeto de texto do placar
var placarText;

// Função para carregar as informações que vai tar no jogo
function preload() {
    // Carrega imagens que eu vou usar no jogoopp
    this.load.image("fundo", 'assets/fundo.png');
    this.load.spritesheet('bonecoanda', 'assets/spritesheet_fim_normalandar.png', { frameWidth: 31.22, frameHeight: 47.75 });
    this.load.image('blocomine', 'assets/bloco.png');
}

// Função para criar elementos iniciais doentro do jogoso
function create() {
    // Adiciona a imagem de fundo no jogo
    var fundo = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'fundo');
    fundo.setScale(this.sys.game.config.width / fundo.width, this.sys.game.config.height / fundo.height);

    // Adiciona o personagem ao jogo
    boneco = this.physics.add.sprite(100, 450, 'bonecoanda');
    boneco.setScale(2.0);

    // Configura animações do personagem
    this.anims.create({
        key: 'correndo',
        frames: this.anims.generateFrameNumbers('bonecoanda', { start: 5, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    // Adiciona uma animação para o personagem parado
    this.anims.create({
        key: 'parado',
        frames: [{ key: 'bonecoanda', frame: 6 }],
        frameRate: 1,
        repeat: -1
    });

    // Inicia a animação de correr
    boneco.anims.play('correndo', true);

    // Configura teclas de seta para controle
    cursors = this.input.keyboard.createCursorKeys();

    // Configura limites do mundo físico
    this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height - 1);
    boneco.setCollideWorldBounds(true);

    // Adiciona o bloco ao jogo
    blocomine = this.physics.add.staticImage(100, 400, 'blocomine');
    this.physics.add.collider(boneco, blocomine);

    // Cria o objeto de texto do placar
    placarText = this.add.text(16, 16, 'PLACAR: 0', { fontSize: '32px', fill: '#fff' });
}

// Função chamada a cada quadro (frame) do jogo
function update() {
    // Verifica se a tecla esquerda está pressionada para mover o personagem
    if (cursors.left.isDown) {
        boneco.setVelocityX(-160);
        boneco.setFlipX(true);
        boneco.anims.play('correndo', true);
        nochao = true;
    }
    // Verifica se a tecla direita está pressionada para mover o personagem
    else if (cursors.right.isDown) {
        boneco.setVelocityX(160);
        boneco.setFlipX(false);
        boneco.anims.play('correndo', true);
        nochao = true;
    }
    // Se nenhuma tecla está pressionada, o personagem para
    else {
        boneco.setVelocityX(0);
        boneco.anims.play('parado', true);
        nochao = true;
    }

    // Verifica se o personagem está no chão e se a tecla de pulo foi pressionada
    if (cursors.up.isDown && nochao == true) {
        // Aplica uma força vertical para simular o pulo
        boneco.setVelocityY(-200);
        nochao = false;

        // Incrementa o placar quando o jogador pula
        placar += 10;
        placarText.setText('PLACAR: ' + placar);
    }
}
