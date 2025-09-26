# NotifyMe.js

NotifyMe.js é uma biblioteca JavaScript simples e leve para exibir mensagens temporárias de notificação de sucesso, erro, aviso ou informações gerais.

## Funcionalidades

- **Tipos de Notificações:** Suporte para mensagens de sucesso, erro, aviso e informação.
- **Personalização:** Ícones, duração, persistência e possibilidade de tornar a notificação dispensável (com botão de fechar).
- **Notificações Temporárias:** As notificações desaparecem automaticamente após um tempo, mas você pode configurá-las como persistentes.
- **Console Logging:** Mensagens podem ser registradas no console para facilitar o debug.

## Como Usar

### Inclusão da Biblioteca

Primeiro, inclua a biblioteca NotifyMe.js no seu projeto. Certifique-se de incluir também o Font Awesome 4.7 para os ícones de notificação.

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo NotifyMe.js</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="notifyme.css">
</head>
<body>
    <!-- Seu conteúdo aqui -->
    <script src="notifyme.js"></script>
</body>
</html>
```

### Exemplo de Uso

Para exibir uma notificação, basta chamar uma das funções disponíveis, como `messageSuccess`, `messageError`, `messageWarning`, ou `messageInfo`. Veja um exemplo básico:

```html
<button onclick="messageSuccess('Operação realizada com sucesso!')">Sucesso</button>
<button onclick="messageError('Ocorreu um erro durante a operação.')">Erro</button>
<button onclick="messageWarning('Atenção! Verifique as informações.')">Aviso</button>
<button onclick="messageInfo('Informação importante a ser considerada.')">Informação</button>
```

### Configurações e Parâmetros

As funções de notificação aceitam um objeto de configuração opcional para personalizar o comportamento da notificação. Aqui estão os parâmetros disponíveis:

- **consoleMessage:** Mensagem a ser exibida no console (padrão: `null`).
- **persistent:** Define se a notificação será persistente e não desaparecerá automaticamente (padrão: `false`).
- **dismissable:** Define se a notificação terá um botão de fechar (padrão: `true`).
- **icon:** Ícone da notificação (padrão: depende do tipo, como `check` para sucesso).
- **duration:** Duração em milissegundos para notificações temporárias (padrão: baseado no tempo de leitura).

Exemplo de uso com parâmetros personalizados:

```javascript
messageSuccess('Sucesso persistente!', { persistent: true, icon: 'thumbs-up' });
```

### Ocultando Notificações Persistentes

Você pode ocultar todas as notificações persistentes com a função `hidePersistent()`:

```javascript
hidePersistent();
```

## Uso do Font Awesome

A biblioteca NotifyMe.js usa **Font Awesome 4.7** por padrão para exibir os ícones nas notificações. Para que os ícones apareçam corretamente, inclua o link para o Font Awesome 4.7 em sua página HTML.

Se preferir usar uma versão diferente do Font Awesome ou outra biblioteca de ícones, você pode modificar o código JavaScript. No arquivo `notifyme.js`, localize a função `_createAlertElement`, onde o ícone é definido:

```javascript
const alertHtml = `
    <div class="alert alert-${this.cssClass} erro-dashboard" style="display: none; z-index: 9999999999;">
        <span class="fa fa-${this.icon}"></span>
        ${this.dismissable ? "<button class='close' aria-hidden='true'>×</button>" : ""}
        ${this.message}
    </div>
`;
```

Substitua a classe `fa fa-${this.icon}` pela classe correspondente do conjunto de ícones que você deseja usar.

## CSS Personalizável

O CSS básico para as notificações está incluído diretamente no arquivo `notifyme.css`. Você pode personalizar os estilos para diferentes tipos de notificações:

```css
.alert {
    /* Personalize o estilo das notificações aqui */
}

.alert-success {
    background-color: #28a745;
    color: white;
}

.alert-danger {
    background-color: #dc3545;
    color: white;
}

.alert-warning {
    background-color: #ffc107;
    color: black;
}

.alert-info {
    background-color: #17a2b8;
    color: white;
}
```

## Exemplo Completo

Aqui está um exemplo completo de uso básico:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo NotifyMe.js</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="notifyme.css">
    <script src="notifyme.js"></script>
</head>
<body>
    <h1>Demo NotifyMe.js</h1>
    <p>Clique nos botões abaixo para exibir diferentes tipos de notificações.</p>

    <button onclick="messageSuccess('Operação realizada com sucesso!')">Sucesso</button>
    <button onclick="messageError('Ocorreu um erro durante a operação.')">Erro</button>
    <button onclick="messageWarning('Atenção! Verifique as informações.')">Aviso</button>
    <button onclick="messageInfo('Informação importante a ser considerada.')">Informação</button>

    <script>
        // Exemplo de notificação de sucesso
        messageSuccess('Operação realizada com sucesso!');
    </script>
</body>
</html>
```

## Licença

Este projeto está licenciado sob a licença MIT.
