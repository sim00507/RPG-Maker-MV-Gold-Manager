(function() {
    
    var guiVisible = false;
    var guiContainer;
    var currentGoldLabel;
    var input;

    var createGui = function() {
        guiContainer = document.createElement('div');
        guiContainer.id = 'goldCheatGui';
        guiContainer.style.position = 'fixed';
        guiContainer.style.top = '10px';
        guiContainer.style.right = '10px';
        guiContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        guiContainer.style.padding = '10px';
        guiContainer.style.borderRadius = '5px';
        guiContainer.style.zIndex = '1000';
        guiContainer.style.color = 'white';
        guiContainer.style.display = 'none';

        currentGoldLabel = document.createElement('div');
        currentGoldLabel.innerText = 'Current Gold: ' + $gameParty.gold();
        guiContainer.appendChild(currentGoldLabel);

        var setGoldLabel = document.createElement('label');
        setGoldLabel.innerText = 'Set Gold: ';
        guiContainer.appendChild(setGoldLabel);

        input = document.createElement('input');
        input.type = 'number';
        input.id = 'goldInput';
        input.style.marginRight = '10px';
        guiContainer.appendChild(input);

        var button = document.createElement('button');
        button.innerText = 'Set';
        button.onclick = function() {
            var newGold = parseInt(input.value, 10);
            if (!isNaN(newGold)) {
                $gameParty._gold = newGold;
                currentGoldLabel.innerText = 'Current Gold: ' + $gameParty.gold(); 
                input.value = ''; //
            }
        };
        guiContainer.appendChild(button);

        document.body.appendChild(guiContainer);
    };

    var updateGoldDisplay = function() {
        if (guiContainer.style.display === 'block') {
            currentGoldLabel.innerText = 'Current Gold: ' + $gameParty.gold();
        }
        requestAnimationFrame(updateGoldDisplay);
    };

    var toggleGui = function() {
        if (guiContainer.style.display === 'none') {
            guiContainer.style.display = 'block';
        } else {
            guiContainer.style.display = 'none';
        }
    };

    var setupKeyBindings = function() {
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Home') {
                toggleGui();
            }
        });
    };

    var _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        createGui();
        setupKeyBindings();
        requestAnimationFrame(updateGoldDisplay); 
    };

    // input 요소에 대한 이벤트 처리 추가
    var preventKeyPropagation = function(event) {
        if (event.target.id === 'goldInput') {
            event.stopPropagation();
        }
    };

    // RPG Maker MV의 기본 키 이벤트 처리 방지
    var originalKeyHandler = Input._onKeyDown;
    Input._onKeyDown = function(event) {
        if (document.activeElement.id !== 'goldInput') {
            originalKeyHandler.call(this, event);
        }
    };

    window.addEventListener('keydown', preventKeyPropagation, true);
    window.addEventListener('keyup', preventKeyPropagation, true);
})();
