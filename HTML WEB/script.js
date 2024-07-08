// Função para salvar uma nova configuração
function saveConfiguration() {
    var dbHost = document.getElementById('dbHost').value;
    var dbUsername = document.getElementById('dbUsername').value;
    var dbPassword = document.getElementById('dbPassword').value;
    var dbName = document.getElementById('dbName').value;

    var configuration = {
        dbHost: dbHost,
        dbUsername: dbUsername,
        dbPassword: dbPassword,
        dbName: dbName
    };

    // Salvando os dados na lista
    saveToLocalStorage(configuration);
    displaySavedData(configuration);

    // Limpar campos após salvar
    document.getElementById('dbHost').value = '';
    document.getElementById('dbUsername').value = '';
    document.getElementById('dbPassword').value = '';
    document.getElementById('dbName').value = '';
}

// Função para salvar no localStorage
function saveToLocalStorage(configuration) {
    var configurations = JSON.parse(localStorage.getItem('configurations')) || [];
    configurations.push(configuration);
    localStorage.setItem('configurations', JSON.stringify(configurations));
}

// Função para exibir dados salvos formatados corretamente
function displaySavedData(configuration) {
    var savedDataContainer = document.getElementById('savedData');
    var listItem = document.createElement('li');
    listItem.textContent = `${configuration.dbHost} | ${configuration.dbUsername} | ${configuration.dbPassword} | ${configuration.dbName}`;

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Apagar';
    deleteButton.addEventListener('click', function() {
        listItem.remove();
        removeFromLocalStorage(configuration);
    });

    listItem.appendChild(deleteButton);
    savedDataContainer.appendChild(listItem);
}

// Função para salvar dados em arquivo de texto
function saveToFile() {
    var configurations = JSON.parse(localStorage.getItem('configurations')) || [];
    var textToSave = configurations.map(function(configuration) {
        return `${configuration.dbHost} | ${configuration.dbUsername} | ${configuration.dbPassword} | ${configuration.dbName}`;
    }).join('\n');

    var blob = new Blob([textToSave], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'DB.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Função para remover do localStorage
function removeFromLocalStorage(configuration) {
    var configurations = JSON.parse(localStorage.getItem('configurations')) || [];
    var updatedConfigurations = configurations.filter(function(config) {
        return !(config.dbHost === configuration.dbHost && config.dbUsername === configuration.dbUsername &&
                 config.dbPassword === configuration.dbPassword && config.dbName === configuration.dbName);
    });
    localStorage.setItem('configurations', JSON.stringify(updatedConfigurations));
}