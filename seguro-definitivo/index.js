
		const ethereumButton = document.querySelector('.enableEthereumButton');

		ethereumButton.addEventListener('click', () => {
		  //Will Start the metamask extension
		  ethereum.request({ method: 'eth_requestAccounts' });
		});

		const ethEnabled = async () => {
		  if (window.ethereum) {
    			await window.ethereum.send('eth_requestAccounts');
					window.web3 = new Web3(window.ethereum);
					window.Seguro = new window.web3.eth.Contract([
					{
						"inputs": [
							{
								"internalType": "uint256",
								"name": "duracaoContrato",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "aluguel",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "parcelas",
								"type": "uint256"
							}
						],
						"name": "contratarSeguro",
						"outputs": [
							{
								"internalType": "uint256",
								"name": "cadastro",
								"type": "uint256"
							}
						],
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [],
						"name": "devolucao",
						"outputs": [
							{
								"internalType": "uint256",
								"name": "dinheiroDevolvido",
								"type": "uint256"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [
							{
								"internalType": "uint256",
								"name": "cadastro",
								"type": "uint256"
							}
						],
						"name": "getDados",
						"outputs": [
							{
								"internalType": "address",
								"name": "carteira",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "pagamentos",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "recebimentoSinistro",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "duracaoContrato",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "ehSegurado",
								"type": "bool"
							},
							{
								"internalType": "uint256",
								"name": "valorApolice",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "ParcelaPremio",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "valorSinistro",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "aluguel",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "parcelasApolice",
								"type": "uint256"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [],
						"name": "getInformacao",
						"outputs": [
							{
								"internalType": "address",
								"name": "",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "",
								"type": "uint256"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [],
						"name": "getMontante",
						"outputs": [
							{
								"internalType": "uint256",
								"name": "",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "",
								"type": "uint256"
							}
						],
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [],
						"name": "pagarPremio",
						"outputs": [],
						"stateMutability": "payable",
						"type": "function"
					},
					{
						"inputs": [],
						"name": "receberSinistro",
						"outputs": [],
						"stateMutability": "payable",
						"type": "function"
					}
				], '0x403F1f9f7E973F19B5b6f24b6d085De41Ae9Dd56');
					saveCoinbase();
					return true;
  		  }
		  return false;
		}


		async function saveCoinbase () {
		  window.coinbase = await window.web3.eth.getCoinbase();
		};


		async function contratarSeguro () {
			var duracaoContrato = document.getElementById("duracaoContrato").value;
			var aluguel = document.getElementById("aluguel").value;
			var parcelas = document.getElementById("parcelas").value;
		  	window.Seguro.methods.contratarSeguro(duracaoContrato,aluguel,parcelas).send(duracaoContrato,aluguel,parcelas, {from:window.coinbase}).then(console.log);

		}

		async function pagarPremio () {
		  window.Seguro.methods.pagarPremio().send({from:window.coinbase});
		}

		async function pagarSinistro () {
		  window.Seguro.methods.receberSinistro().send({from:window.coinbase});
		}
		async function devolucao () {
		  window.Seguro.methods.devolucao().send({from:window.coinbase});
		}

		async function getDados () {
			var cadastro = document.getElementById("cadastro").value;
		  	var dados = window.Seguro.methods.getDados(cadastro).call().then(console log());
		  	var val = await dados;

		  	document.getElementById("carteira").value = val[0];
		  	document.getElementById("pagamentoPremio").value = val[1];
		  	document.getElementById("recebimentoSinistro").value = val[2];
		  	document.getElementById("duracaoContrato").value = val[3];
		  	document.getElementById("ehSegurado").value = val[4];
		  	document.getElementById("valorApolice").value = val[5];
		  	document.getElementById("premioParcelado").value = val[6];
		  	document.getElementById("valorSinistro").value = val[7];
		  	document.getElementById("aluguel").value = val[8];
		  	document.getElementById("parcelasApolice").value = val[9];
		};
		async function getInformacao () {
		  var dados1 = window.Seguro.methods.getInformacao().call();
		  var val1 = await dados1;

		  document.getElementById("carteira").value = val1[0];
		  document.getElementById("pagamentoPremio").value = val1[1];
		  document.getElementById("valorApolice").value = val1[2];
		  document.getElementById("premioParcelado").value = val1[3];
		  document.getElementById("parcelasApolice").value = val1[4];
		}
		async function getMontante () {
		  window.Seguro.methods.getMontante().call({from:window.coinbase});
		}

		if (!ethEnabled()) {
		  alert("Metamask or browser with Ethereum not detected!");
		}
