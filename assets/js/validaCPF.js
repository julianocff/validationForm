class Validacpf {
    constructor(cpf) {
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: cpf.replace(/\D+/g, '')
        })
    }

    valida() {
        if (this.cpfLimpo.length !== 11) return false
        if (this.isSequence()) return false
        const cpfParcial = this.cpfLimpo.slice(0, -2)
        const digito1 = this.cpfArray(cpfParcial)
        const digito2 = this.cpfArray(cpfParcial + digito1)
        const compareCpf = cpfParcial + digito1 + digito2
        return compareCpf === this.cpfLimpo
    }

    cpfArray(cpfParcial) {
        const cpfArray = Array.from(cpfParcial)
        let regressive = cpfArray.length + 1
        const total = cpfArray.reduce((acumulator, value) => {
            acumulator += regressive * Number(value)
            regressive--
            return acumulator
        }, 0)
        const digito = 11 - (total % 11)
        return digito > 9 ? '0' : String(digito)
    }

    isSequence() {
        const sequencia = this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length)
        return sequencia === this.cpfLimpo
    }
}

// const cpf = new Validacpf('241.533.622-04')

// if (cpf.valida()) {
//     console.log('CPF valido')
// } else {
//     console.log('CPF invalido')
// }