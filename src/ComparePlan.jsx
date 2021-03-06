import './App.css';
import { useEffect, useState } from 'react';

function ComparePlan({plans = [], setShowCompare}) {
	console.log(plans);
	const [comparisionHeader, setComparisonHeader] = useState({});
	const [comparisionBody, setComparisonbody] = useState({});
	useEffect(() => {
		const headerData = {
			premium: [],
			image: [],
			name: []
		};
		const coverArr = {};
		plans.map((value) => {
			const {premium, provider, covers = []} = value || {};
			const {image_url, name} = provider['en-ae'] || {};
			headerData.premium = [...headerData.premium, premium];
			headerData.image = [...headerData.image, image_url];
			headerData.name = [...headerData.name, name];
			covers.map((cVal) => {
				if(coverArr[cVal.name]){
					coverArr[cVal.name] = [...coverArr[cVal.name], cVal];
				} else {
					coverArr[cVal.name] = [cVal];
				}
			})
		});
		setComparisonbody(coverArr);
		setComparisonHeader(headerData);
	}, []);
	const {premium = [], image = [], name = []} = comparisionHeader || {};

	const convertCamelToSentence = (str) => {
		const result = str.replace(/([A-Z])/g,' $1');
		const final = result.charAt(0).toUpperCase()+result.slice(1);
		return final;
	}
	// console.log(comparisionBody);
	return (
		<div className="App">
			<div className='actions' style={{justifyContent: 'flex-start'}}>
				<button onClick={() => setShowCompare(false)}>Back to Home</button>
			</div>
			<table className='comparison-table'>
				<thead>
					<tr>
						<th></th>
						{image.map((val, index) => <th key={index}><img src={val}/></th>)}
					</tr>
					<tr>
						<th>Comapny Name</th>
						{name.map((val, index) => <th key={index}>{val}</th>)}
					</tr>
					<tr>
						<th>Premium</th>
						{premium.map((val, index) => <th key={index}>&#x20b9; {val}/Month</th>)}
					</tr>
				</thead>
				<tbody>
					{
						Object.keys(comparisionBody).map((val, index) => {
							return (
								<tr>
									<td>{convertCamelToSentence(val)}</td>
									{
										comparisionBody[val].map((cVal, cIndex) => {
											const {name, options = [], selected, type} = cVal;
											const { text = '', cost} = options[0] || {};
											return (
												<td key={cIndex}>
													<div className='det-row-td'>
														<span className='type'>{type}</span>
														{cost && <span className='cost'>&#x20b9; {cost}</span>}
														{text && <span className='text'>{text}</span>}
													</div>
												</td>
											)
										})
									}
								</tr>
							)
						})
					}
					
				</tbody>
			</table>
		</div>
	);
}

export default ComparePlan;
