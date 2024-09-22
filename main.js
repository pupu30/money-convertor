const populate = async (value, currency) => {
	let myStr = "";

	await fetch(
		"https://api.currencyapi.com/v3/latest?apikey=cur_live_rZUmV95ty50QoO07s8sM1vMttFiYqwxQDqhhfthh&base_currency =" +
			currency,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
		.then((res) => {
			return res.json();
		})
		.then((rJson) => {
			document.querySelector(".output").style.display = "block";
			for (let key of Object.keys(rJson["data"])) {
				myStr += `<tr>
                    <td>${key}</td>
                      <td>${rJson["data"][key]["code"]}</td>
                     <td>${Math.round(
												rJson["data"][key]["value"] * value
											)}</td></td>
                </tr>

            `;
			}
			const tableBody = document.querySelector("tbody");

			tableBody.innerHTML = myStr;
		})
		.catch((err) => {
			console.log(err);
		});
};
const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
	e.preventDefault();

	const form = document.querySelector("form");

	const formData = new FormData(form);
	const value = parseInt(formData.get("quantity"));
	const currency = formData.get("Currency");

	populate(value, currency);
});