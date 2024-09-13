document.addEventListener('DOMContentLoaded', function() {
    let basket = document.getElementById('basket');
    let fallingObject = document.getElementById('fallingObject');
    let scoreDisplay = document.getElementById('score');
    let score = 0;
    let gameArea = document.getElementById('gameArea');
    let gameAreaWidth = gameArea.clientWidth;
    let basketSpeed = 20; 
    let objectFallSpeed = 5; 
    let gameOver = false; 

    // Déplacement du panier avec les touches fléchées
    document.addEventListener('keydown', function(e) {
        let basketLeft = basket.offsetLeft;
        let basketWidth = basket.offsetWidth;

        if (e.key === 'ArrowLeft' && basketLeft > 0) {
            basket.style.left = Math.max(0, basketLeft - basketSpeed) + 'px';
        }
        if (e.key === 'ArrowRight' && basketLeft < gameAreaWidth - basketWidth) {
            basket.style.left = Math.min(gameAreaWidth - basketWidth, basketLeft + basketSpeed) + 'px';
        }
    });

    // Fonction pour générer et faire tomber l'objet
    function dropObject() {
        let objectWidth = fallingObject.offsetWidth;
        let objectHeight = fallingObject.offsetHeight;
        let objectLeft = Math.random() * (gameAreaWidth - objectWidth);
        fallingObject.style.left = objectLeft + 'px';
        fallingObject.style.top = '-30px'; 

        let dropInterval = setInterval(function() {
            let objectTop = fallingObject.offsetTop;
            let basketLeft = basket.offsetLeft;
            let basketWidth = basket.offsetWidth;
            let basketRight = basketLeft + basketWidth;
            let objectRight = objectLeft + objectWidth;

            // Faire tomber l'objet
            if (objectTop < gameArea.clientHeight - objectHeight) {
                fallingObject.style.top = objectTop + objectFallSpeed + 'px';
            } else {
                // Vérifier la collision entre l'objet et le panier
                if (objectLeft < basketRight && objectRight > basketLeft) {
                    score++;
                    scoreDisplay.textContent = 'Score: ' + score;

                    // Condition de fin de jeu
                    if (score >= 10) {
                        gameOver = true;
                        scoreDisplay.textContent += " - Bravo !";
                        clearInterval(dropInterval);
                        
                        // Afficher un message de félicitations
                        let bravoMessage = document.createElement('div');
                        bravoMessage.textContent = "Bravo ! Vous avez gagné !";
                        bravoMessage.style.fontSize = "30px";
                        bravoMessage.style.color = "#4CAF50";
                        bravoMessage.style.textAlign = "center";
                        bravoMessage.style.marginTop = "20px";
                        document.body.appendChild(bravoMessage);

                        
                        return; 
                    }
                }
                // Réinitialiser la position de l'objet
                fallingObject.style.top = '-30px';
                dropObject(); 
                clearInterval(dropInterval);
            }
        }, 20);
    }

    // Démarrer le jeu
    dropObject();
});
