
//exportando a classe 

export default class cena1 extends Phaser.Scene{

constructor(){
    super({
        key: 'cena1'
    })
    this.placar = 0
var moeda
}


// Função para carregar as informações que vai tar no jogo
    preload() {
        // Carrega imagens que eu vou usar no jogoopp
        this.load.image("fundo", 'assets/fundo.png');
        this.load.spritesheet('bonecoanda', 'assets/spritesheet_fim_normalandar.png', { frameWidth: 31.22, frameHeight: 47.75 });
        this.load.image('blocomine', 'assets/bloco.png');
        this.load.image('blocomine2', 'assets/bloco.png');
        this.load.image('blocomine3', 'assets/bloco.png');
        this.load.image('blocomine4', 'assets/bloco.png');
        this.load.image('setinhas', 'assets/setinhas.png');
        this.load.image('moeda', 'assets/moeda.png');
        this.load.image('coletavel', 'assets/moeda.png');
        this.load.image('obstaculo', 'assets/obstaculo.png');

    }

    // Função para criar elementos iniciais doentro do jogoso
    create() {

    
        // Adiciona a imagem de fundo no jogo
        var fundo = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'fundo');
        fundo.setScale(this.sys.game.config.width / fundo.width, this.sys.game.config.height / fundo.height);
        
        

        // Adiciona o personagem ao jogo
        this.boneco = this.physics.add.sprite(100, 300, 'bonecoanda');
        this.boneco.setScale(2.0);
        this.boneco.body.setSize(20, 25, true)

        // Configura animações do personagem
        this.anims.create({
            key: 'correndo',
            frames: this.anims.generateFrameNumbers('bonecoanda', { start: 5, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });

        // Adiciona uma animação para o personagem parado
        this.anims.create({
            key: 'parado',
            frames: [{ key: 'bonecoanda', frame: 6 }],
            frameRate: 1,
            repeat: -1
        });

        // Inicia a animação de correr
        this.boneco.anims.play('correndo', true);

        // Configura teclas de seta para controle
        this.cursors = this.input.keyboard.createCursorKeys();

        // Configura limites do mundo físico
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height - 1);
        this.boneco.setCollideWorldBounds(true);

        // Adiciona o bloco ao jogo
        this.obstaculo = this.physics.add.staticImage(700,300, 'obstaculo');
        this.blocomine4 =  this.physics.add.staticImage(1200,400, 'blocomine4');
        this.blocomine3 = this.physics.add.staticImage(900,400, 'blocomine3');
        this.blocomine2 = this.physics.add.staticImage(520,400, 'blocomine2');
        this.blocomine = this.physics.add.staticImage(100, 400, 'blocomine');
        this.physics.add.collider(this.blocomine4, this.boneco);
        this.physics.add.collider(this.blocomine, this.boneco);
        this.physics.add.collider(this.blocomine2,this.boneco);
        this.physics.add.collider(this.blocomine3,this.boneco);
        this.physics.add.collider(this.obstaculo, this.boneco);

        
        //ajustando o tamanho da imagem e colisão dos blocos
        this.obstaculo.setSize(68,332)
        this.obstaculo.setScale(1.5)
        this.blocomine.setSize(183.2,55)
        this.blocomine.setScale(0.3)
        this.blocomine2.setSize(183.2,55);
        this.blocomine2.setScale(0.3)
        this.blocomine3.setSize(183.2,55);
        this.blocomine3.setScale(0.3);
        this.blocomine4.setSize(183.2,55);
        this.blocomine4.setScale(0.3);

        // Cria o objeto de texto do placar
        this.placarText = this.add.text(16, 16, 'PLACAR: 0', { fontSize: '32px', fill: '#fff' });

        //adicionando o segundo bloco

         // adiciona a imagem que é referente as setinhas do jogo
        this.setinhas = this.add.image(300, 100, 'setinhas'); 

        //da um setscale para diminuir a imagem
        this.setinhas.setScale(0.3); 


        //colocando a camera para seguir o personagem
        this.cameras.main.setBounds(0, 0, this.sys.game.config.width * 2, this.sys.game.config.height);
        this.cameras.main.startFollow(this.boneco);



         //aqui eu tentei botar a moeda, mas depois disso não consegui mais. Então deixei o sistema de placar por pulos (espero que conte)
        this.coletavel = this.physics.add.sprite(200, 200, 'coletavel');
         this.coletavel.setScale(0.3); // Ajuste conforme necessário
    
        
    }

    // Função chamada a cada quadro (frame) do jogo
    update() {


        const noChao = this.boneco.body.onFloor();
        // Verifica se a tecla esquerda está pressionada para mover o personagem
        if (this.cursors.left.isDown) {
            this.boneco.setVelocityX(-160);
            this.boneco.setFlipX(true);
            this.boneco.anims.play('correndo', true);
            this.nochao = true;
        }
        // Verifica se a tecla direita está pressionada para mover o personagem
        else if (this.cursors.right.isDown) {
            this.boneco.setVelocityX(160);
            this.boneco.setFlipX(false);
            this.boneco.anims.play('correndo', true);
            this.nochao = true;
        }
        // Se nenhuma tecla está pressionada, o personagem para
        else {
            this.boneco.setVelocityX(0);
            this.boneco.anims.play('parado', true);
            this.nochao = true;
        }

        // Verifica se o personagem está no chão e se a tecla de pulo foi pressionada
        if (this.cursors.up.isDown && noChao) {
            // Aplica uma força vertical para simular o pulo
            this.boneco.setVelocityY(-500);
            this.pulosRestantes --;
            
            
      //lista vetor contando cada vez que o update é executado
            this.vetor = [1, 2, 3, 4, 5, 6,7,8];

            console.log(this.vetor[1],this.vetor[2],this.vetor[3], this.vetor[4], this.vetor[5]);

            // Incrementa o placar quando o jogador pula
            this.placar += 10
            this.placarText.setText('PLACAR DE PULOS: ' + this.placar);
        }
    }
}
