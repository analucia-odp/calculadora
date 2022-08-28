import React, {Component} from 'react'
import './Calculator.css'
import '../components/Button'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0', /*valor e aparece no display*/
    clearDisplay: false, /*precisa ou nao limpar o display*/
    operation: null, /*al operacao deve ser realizada*/
    values: [0, 0], /*vetor onde a 1 pos = valor digitado primeiro e a 2 pos = valor digitado apos clicar em uma operacao*/
    current: 0 /*al indice vc ta usando no vetor acima*/
}

const Calculadora = class Calculator extends Component
{
    state = {...initialState} /*variavel e recebe o valor do estado inicial do display*/
    constructor(props)
    {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory()
    {
        this.setState ({...initialState}) /*seta o display para o estado inicial*/
    }

    setOperation(operation)
    {
        if (this.state.current == 0) /*se o indice do vetor for 0*/
        {
            this.setState ({operation, current : 1, clearDisplay: true})
        }else {
            const equals = operation == '='
            const currentOperation = this.state.operation 

            const values = [...this.state.values]
            try{
                values[0] = eval (`${values[0]} ${currentOperation} ${values[1]}`)
            }catch(e){
                values[0] = this.state.values[0]
            }
            values[1] = 0
            this.setState({
                displayValue: values[0],
                operation: equals ? null:operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals, 
                values
            })
        }
    }

    addDigit(n){
        if (n == '.' && this.state.displayValue.includes('.'))
        {
            /*se o valor guardado na variavel display value for ponto e se o novo valor for ponto*/
            /** evitar e tenha dois pontos na calculadora*/
            return
        }

        const clearDisplay = this.state.displayValue == '0'
            || this.state.clearDisplay /*vai seu true se o valor do display for 0 ou se clicar no botao de limpar*/
        const currentValue = clearDisplay ? '' : this.state.displayValue
        /*true se for necessário limpar o display,senao, vai receber o valor do display*/
        const displayValue = currentValue + n /*valor final do display*/
        this.setState({displayValue, clearDisplay: false}) /*atualiza o display com o valor e se nao precisar limpar ele*/

        if (n !== '.') /*ou seja, 0,1,2,3,4,5*/
        {
            const i = this.state.current /*recebe o indice*/
            const newValue = parseFloat(displayValue) /*converte em float o valor do display*/
            const values = [...this.state.values] /*clonei os valores do vetor*/
            values[i] = newValue
            this.setState({values})
            console.log(values)
        }
    }

    render()
    {
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)
        return (
            <div className = "calculator">
                <Display value={this.state.displayValue} />
                <Button label = "AC" click={this.clearMemory} triple></Button>
                <Button label = "/" click={this.setOperation} operation></Button>
                <Button label = "7" click={this.addDigit}></Button>
                <Button label = "8" click={this.addDigit}></Button>
                <Button label = "9" click={this.addDigit}></Button>
                <Button label = "*" click={this.setOperation} operation></Button>
                <Button label = "4" click={this.addDigit}></Button>
                <Button label = "5" click={this.addDigit}></Button>
                <Button label = "6" click={this.addDigit}></Button>
                <Button label = "-" click={this.setOperation} operation></Button>
                <Button label = "1" click={this.addDigit}></Button>
                <Button label = "2" click={this.addDigit}></Button>
                <Button label = "3" click={this.addDigit}></Button>
                <Button label = "+" click={this.setOperation} operation></Button>
                <Button label = "0" click={this.addDigit} double></Button>
                <Button label = "." click={this.addDigit} operation></Button>
                <Button label = "=" click={this.setOperation} operation></Button>
            </div>
        )
    }
}
export default Calculadora;