//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

PluginManager._path = 'js/plugins/';
PluginManager.loadScript('GoldCheat.js');

window.onload = function() {
    SceneManager.run(Scene_Boot);
};
