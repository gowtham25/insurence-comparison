import './App.css';
import { insuranceDetails } from './data.js';
import React, { useEffect, useState } from 'react';
import ComparePlan from './ComparePlan';

function App() {
	const [insuranceList, setInsuranceList] = useState(insuranceDetails);
	const [sortOption, setSortOption] = useState();
	const [selectedList, setSelectedList] = useState({});
	const [showCompare, setShowCompare] = useState(false);
	const [compareList, setCompareResult] = useState([]);
	useEffect(() => {
		if(sortOption === 'lowToHigh') {
			setInsuranceList(insuranceDetails.sort((a,b) => b.premium - a.premium))
		} else if(sortOption === 'highToLow'){
			setInsuranceList(insuranceDetails.sort((a,b) => a.premium - b.premium))
		}
	}, [sortOption])
	const handlecompare = (data) => {
		const compList = Object.values(selectedList);
		setCompareResult(compList);
		setShowCompare(true);
	}	
	console.log(compareList);

	const onCheckCompare = (data) => {
		let cloneSelectedList = {...selectedList};
		console.log(data.premium);
		if(selectedList[data.premium]){
			delete cloneSelectedList[data.premium];
		}else {
			cloneSelectedList = {...cloneSelectedList, [data.premium]: data};
		}
		setSelectedList(cloneSelectedList);
	}
	return (
		<div className="App">
			{!showCompare ? (
				<>
					{Object.keys(selectedList).length > 0 && (
						<div className='actions'>
							<button onClick={() => handlecompare()}>Compare</button>
						</div>
					)}
					<div className='body-container'>
						<div className='sideBar'>
							<div className='actions action1'>
								<div className='sort-container'>
									<div className='sort-q-cont'>
										<span className='header'>Sort:</span>
										<div><input type='radio' checked={sortOption === 'highToLow'} onChange={() => setSortOption('highToLow')} id='hightoLow'/> <label htmlFor='hightoLow'>Price: High to Low</label></div>
										<div><input type='radio' checked={sortOption === 'lowToHigh'} onChange={() => setSortOption('lowToHigh')} id='lowToHigh'/> <label htmlFor='lowToHigh'>Price: Low to High</label></div>
									</div>
								</div>
							</div>
						</div>
						<div className='insurance-listing-container'>
							{
								insuranceList.map((val, index) => {
									const {insurance_type, premium, provider = {}} = val || {};
									const {description = '', image_url = '', name = '', product_name = '', terms_conditions_url =''} = provider['en-ae'] || {};
									return (
										<div className='individual-container' key={index}>
											<div className='left'>
												<img src={image_url}/>
											</div>
											<div className='right'>
												<div className='right-cont'>
													<div>
														<span className='name'>{name}</span>
														(<span>{product_name}</span>)
													</div>
													<span className='amount-per-month'>&#x20b9; {premium}/Month</span>
												</div>
												<p className='description'>{description}</p>
												<div className='bottom-container'>
													<div className='comparison-container'>
														<input checked={selectedList[premium] ? true : false} type='checkbox' onChange={() => {onCheckCompare(val)}} id={index}/> <label htmlFor={index}>Add to compare</label>
													</div>
													<p className='terms' onClick={() => {window.open(terms_conditions_url)}}>Terms & conditions</p>
												</div>
												
											</div>
										</div>
									)
								})
							}
						</div>
					</div>
				</>
			) :  (
				<ComparePlan 
					plans={compareList}
					setShowCompare={setShowCompare}
				/>
			)}
		</div>
	);
}

export default App;
