const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const mealPlannerBody = document.getElementById('meal-planner-body');
weekDays.forEach(day => {
    const mealRow = document.createElement('tr');
    mealRow.innerHTML = `
        <td>${day}</td>
        <td><input type = "text" placeholder = "Enter Breakfast"></td>
        <td><input type = "text" placeholder = "Enter Snack"></td>
        <td><input type = "text" placeholder = "Enter Lunch"></td>
        <td><input type = "text" placeholder = "Enter Snack"></td>
        <td><input type = "text" placeholder = "Enter Dinner"></td>
    `;
    mealPlannerBody.appendChild(mealRow);
});

function clearMealPlanner() {
    const inputs = document.querySelectorAll('#meal-planner-body input');
    inputs.forEach(input => input.value = '');
    alert("Your meal planner has been cleared!");
}

function printMealPlanner() {
    const mealPlanner = document.querySelector('.meal-planner');
    const mealRows = document.querySelectorAll('#meal-planner-body tr');

    let tableContent = `
        <table>
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Breakfast</th>
                    <th>Snack</th>
                    <th>Lunch</th>
                    <th>Snack</th>
                    <th>Dinner</th>
                </tr>
            </thead>
            <tbody>
    `;

    mealRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const meals = Array.from(inputs).map(input => input.value);
        const day = row.querySelector('td')?.textContent || "Day";
        tableContent += `
            <tr>
                <td>${day}</td>
                ${meals.map(meal => `<td>${meal}</td>`).join('')}
            </tr>
        `;
    });

    tableContent += `
            </tbody>
        </table>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Print Meal Planner</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #121212;
                    color: #ffffff;
                    padding: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }  
                th, td {
                    border: 1px solid #ffffff;
                    padding: 10px;
                    text-align: center;
                }
                th {
                    background-color: #272626;
                }
            </style>
        </head>
        <body>
            <h1>Meal Planner</h1>
            ${tableContent}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}


function downloadMealPlanner() {
    const mealRows = document.querySelectorAll('#meal-planner-body tr');
    const mealPlanning = [];
    mealRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const meals = Array.from(inputs).map(input => input.value);
        mealPlanning.push(meals);
    });

    const userName = document.getElementById('name')?.value || "Anon";

    let textContent = `Your Meal Plan:\n\nName: ${userName}\n\n`;
    textContent += "Day | Breakfast | Snack | Lunch | Snack | Dinner\n";
    textContent += "-----------------------------------------------\n";

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    mealPlanning.forEach((meals, index) => {
        const day = weekDays[index];
        const row = [day, ...meals].join(' | ');
        textContent += row + "\n";
    });

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meal_plan.txt';
    a.click();
    URL.revokeObjectURL(url);
    alert("Your meal plan has been downloaded successfully!");
}

function generateMealPlanner() {
    const userName = document.getElementById('name')?.value || "No Name Provided";
    const userEmail = document.getElementById('email')?.value || "";
    const mealRows = document.querySelectorAll('#meal-planner-body tr');
    const mealPlanning = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        alert("Please enter a valid email address.");
        return;
    }

    mealRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const meals = Array.from(inputs).map(input => input.value);
        mealPlanning.push(meals);
    });

    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Generated Meal Planner</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #121212;
                    color: #ffffff;
                    padding: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }  
                th, td {
                    border: 1px solid #ffffff;
                    padding: 10px;
                    text-align: center;
                }
                th {
                    background-color: #272626;
                }
            </style>
        </head>
        <body>
            <h1>Meal Planner for ${userName}</h1>
            <p>Email: ${userEmail}</p>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Snack</th>
                        <th>Lunch</th>
                        <th>Snack</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
                    ${mealPlanning.map((meals, index) => `
                        <tr>
                            <td>${weekDays[index]}</td>
                            ${meals.map(meal => `<td>${meal || "N/A"}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </body>
        </html>
    `);
    newWindow.document.close();
}