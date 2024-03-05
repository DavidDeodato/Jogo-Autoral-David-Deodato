// Definição da classe cena2 que representa a tela que fica no inicio do jogo

export default class cena2 extends Phaser.Scene {

    // Construtor da classe/cena2
    constructor(){
        super({
            key: 'cena2'
        })
    }

    // Função create, chamada ao iniciar a cena
    create(){

        // Adiciona um texto tela inicial
        this.placarText = this.add.text(650, 16, 'TELA INICIAL', { fontSize: '32px', fill: '#fff' });

        // Adiciona um texto CLIQUE aqui: jogar
        this.jogarText = this.add.text(580, 285, 'CLIQUE AQUI: JOGAR', { fontSize: '32px', fill: '#fff' });

        // deixa o texto clique aqui: jogar interativo
        this.jogarText.setInteractive();

        // Configura um evento de clique para o mudar de cena
        this.jogarText.on('pointerup', () => {
            this.scene.switch('cena1');
        });
    }
}
