import React, { useState, memo, useCallback, useMemo } from 'react'

const ChildComponent = memo(() => {
	console.log('Render de ChildComponent')
	return (
		<p>Random Child Component</p>
	)
})

const Button = memo(({ children, onClick }: {
	children: React.ReactNode,
	onClick: any
}) => {
	console.log(`Render de Button ${children}`)
	return (
		<button onClick={onClick}>{children}</button>
	)
})

// Fake expensive function to compute
const expensiveCompute = (a: number, b: number) => {
	let counter = 1000000000
	while (counter > 0) {
		counter--
	}
	return a * b
}

const Optimisations = () => {
	const [counter, setcounter] = useState(0)
	const [value, setvalue] = useState(1)
	const increment = useCallback(() => setcounter(c => c + value), [value])
	const decrement = useCallback(() => setcounter(c => c - value), [value])
	const result = useMemo(() => expensiveCompute(1, value), [value])
	return (
		<section>
			<h1>Optimisations</h1>
			<p>Counter: {counter}</p>
			<p>Result function to compute: {result}</p>
			<input type="number" value={value} onChange={e => setvalue(+e.target.value)} />
			<ChildComponent />
			<Button onClick={increment}>Incrémenter</Button>
			<Button onClick={decrement}>Décrémenter</Button>
		</section>
	)
}

export default Optimisations