class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.form')
        this.eventos()
    }

    eventos(e) {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const checkFild = this.checkFild()
        const validPassword = this.validPassword()
        if (checkFild && validPassword) {
            alert('Formuario enviado')
            this.formulario.submit()
        }
    }

    validPassword() {
        let valid = true
        const password = this.formulario.querySelector('.senha')
        const confirmPassword = this.formulario.querySelector('.confirm-senha')

        if (password.value !== confirmPassword.value) {
            valid = false
            this.createError(password, 'As senhas não conferem')
            this.createError(confirmPassword, 'As senhas não conferem')
        }

        if (password.value.length < 5 || password.value.length > 20) {
            valid = false
            this.createError(password, 'Campo senha deve ter entre 5 e 20 caracteres')
        }

        return valid
    }


    checkFild() {
        let valid = true

        for (let errors of this.formulario.querySelectorAll('.msg-error')) {
            errors.remove()
        }
        for (let campo of this.formulario.querySelectorAll('.valid')) {
            const beforeLabel = campo.previousElementSibling.innerHTML
            if (!campo.value) {
                this.createError(campo, `Campo ${beforeLabel} é obrigatório`)
                valid = false
            }
            if (campo.classList.contains('cpf')) {
                if (!this.validaCpf(campo)) valid = false
            }
            if (campo.classList.contains('usuario')) {
                if (!this.validUser(campo)) valid = false
            }
        }
        return valid
    }
    validUser(campo) {
        const user = campo.value
        let valid = true
        if (user.length < 3 || user.length > 12) {
            this.createError(campo, 'Usuário deve conter entre 3 e 12 caracteres')
            valid = false
        }
        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(campo, 'Nome do usuário deve conter apenas letras e/ou numeros')
            valid = false
        }
        return valid
    }
    validaCpf(campo) {
        const cpf = new Validacpf(campo.value)
        if (!cpf.valida()) {
            this.createError(campo, 'CPF Inválido')
            return false
        }
        return true
    }

    createError(campo, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('msg-error')
        campo.insertAdjacentElement('afterend', div)
    }
}

const formulario = new ValidaFormulario()