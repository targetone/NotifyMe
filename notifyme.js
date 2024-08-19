class AlertNotification {
    constructor(message, consoleMessage = "", cssClass = "", icon = "", duration = null) {
        this.name = this._getUniqueID("alert-helper");
        this.message = message;
        this.consoleMessage = consoleMessage;
        this.cssClass = cssClass;
        this.icon = icon;
        this.boxId = 'alerts-list';
        this.duration = duration ?? (this._calcularTempoLeitura(message) + 1500);
    }

    get box() {
        const boxElement = document.getElementById(this.boxId);
        if (!boxElement) {
            console.warn(`Box element with ID ${this.boxId} not found. Creating a new one.`);
            const alertsList = document.createElement('div');
            alertsList.id = this.boxId;
            document.body.prepend(alertsList);
            return alertsList;
        }
        return boxElement;
    }

    get elem() {
        const alertElem = document.querySelector(`${this.id} .alert`);
        if (!alertElem) {
            console.warn(`Alert element with ID ${this.id} not found.`);
        }
        return alertElem;
    }

    get father() {
        return document.getElementById(this.name);
    }

    get id() {
        return `#${this.name}`;
    }

    set isPersistent(value) {
        this.boxId = value ? 'alerts-list-persistent' : 'alerts-list';
        this.persistent = value;
    }

    set isDismissable(value) {
        this.dismissable = value;
    }

    _calcularTempoLeitura(texto) {
        if(texto == null)
            return 0;

        const palavras = texto.split(/\s+/).length;
        return Math.round((palavras / (230 / 60)) * 1000);
    }

    _getUniqueID(prefix) {
        let id;
        do {
            id = `${prefix}-${Math.floor(Math.random() * 1000000)}`;
        } while (document.getElementById(id));
        return id;
    }

    _createAlertElement() {
        const alertContainer = document.createElement('div');
        alertContainer.id = this.name;
        this.box.prepend(alertContainer);

        const alertHtml = `
            <div class="alert alert-${this.cssClass} erro-dashboard" style="display: none; z-index: 9999999999;">
                <span class="fa fa-${this.icon}"></span>
                ${this.dismissable ? "<button class='close' aria-hidden='true'>×</button>" : ""}
                ${this.message}
            </div>
        `;

        alertContainer.innerHTML = alertHtml;
        return alertContainer.querySelector('.alert');
    }

    _handleClose(alertElem) {
        const closeButton = alertElem.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                alertElem.style.display = 'none';
                alertElem.parentElement.remove();
            });
        } else {
            console.warn("Close button not found for dismissable alert.");
        }
    }

    _removeOtherAlerts() {
        const otherAlerts = document.querySelectorAll(`.persistent:not(#${this.name})[id*='alert-helper'] .alert`);
        otherAlerts.forEach(alert => {
            alert.style.display = 'none';
            alert.parentElement.remove();
        });
    }

    _hideAlert(alertElem) {
        setTimeout(() => {
            if (alertElem && alertElem.parentElement) {
                alertElem.style.display = 'none';
                alertElem.parentElement.remove();
            }
        }, this.duration);
    }

    showMessage() {
        if (this.consoleMessage) console.log(this.consoleMessage);

        const alertElem = this._createAlertElement();
        if (!alertElem) {
            console.error("Failed to create alert element.");
            return;
        }

        alertElem.style.display = 'block';

        if (this.persistent) {
            this.father.classList.add("persistent");
            this._removeOtherAlerts();
        }

        if (this.dismissable) {
            alertElem.classList.add("alert-dismissable");
            this._handleClose(alertElem);
        }

        if (!this.persistent) this._hideAlert(alertElem);
    }

    hideAlerts() {
        const alerts = document.querySelectorAll(`[id*='alert-helper']:not(.persistent) .alert`);
        if (alerts.length === 0) {
            console.warn("No non-persistent alerts found to hide.");
        }
        alerts.forEach(alert => {
            alert.style.display = 'none';
            alert.parentElement.remove();
        });
    }

    hidePersistents() {
        const persistentAlerts = document.querySelectorAll(`.persistent[id*='alert-helper'] .alert`);
        if (persistentAlerts.length === 0) {
            console.warn("No persistent alerts found to hide.");
        }
        persistentAlerts.forEach(alert => {
            alert.style.display = 'none';
            alert.parentElement.remove();
        });
    }
}

const messageError = (message, options = {}) => {
    const { consoleMessage, persistent, dismissable, icon, duration } = {
        consoleMessage: null,
        persistent: false,
        dismissable: true,
        icon: "ban",
        duration: null,
        ...options
    };

    const notification = new AlertNotification(
        message || "Ops! Ocorreu um erro.",
        consoleMessage,
        "danger",
        icon,
        duration
    );
    notification.isPersistent = persistent;
    notification.isDismissable = dismissable;
    notification.showMessage();
};

const messageSuccess = (message, options = {}) => {
    const { consoleMessage, persistent, dismissable, icon, duration } = {
        consoleMessage: null,
        persistent: false,
        dismissable: true,
        icon: "check",
        duration: null,
        ...options
    };

    const notification = new AlertNotification(
        message || "Operação concluída com sucesso!",
        consoleMessage,
        "success",
        icon,
        duration
    );
    notification.isPersistent = persistent;
    notification.isDismissable = dismissable;
    notification.showMessage();
};

const messageWarning = (message, options = {}) => {
    const { consoleMessage, persistent, dismissable, icon, duration } = {
        consoleMessage: null,
        persistent: false,
        dismissable: true,
        icon: "exclamation-triangle",
        duration: null,
        ...options
    };

    if (!message) throw new Error("Warning message can't be null");

    const notification = new AlertNotification(message, consoleMessage, "warning", icon, duration);
    notification.isPersistent = persistent;
    notification.isDismissable = dismissable;
    notification.showMessage();
};

const messageInfo = (message, options = {}) => {
    const { consoleMessage, persistent, dismissable, icon, duration } = {
        consoleMessage: null,
        persistent: false,
        dismissable: true,
        icon: "info-circle",
        duration: null,
        ...options
    };

    if (!message) throw new Error("Info message can't be null");

    const notification = new AlertNotification(message, consoleMessage, "info", icon, duration);
    notification.isPersistent = persistent;
    notification.isDismissable = dismissable;
    notification.showMessage();
};

const hidePersistent = () => {
    new AlertNotification().hidePersistents();
};
