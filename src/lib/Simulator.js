import { map } from "@/data/gameData";
import { random } from "gsap";
export class Simulator {
  constructor(BallManager, canvasWidth, canvasHeight, rows) {
    this.BallManager = BallManager;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.rows = rows;
    this.simulationData = {
      dimension: { width: canvasWidth, height: canvasHeight },
      rows: rows,
      records: {},
    };

    this.noOfBets = 500;
    this.delay = 0.4; // in seconds

    this.lowX = 150; // x position from canvasWidth / 2
    this.highX = 150; // x position from canvasWidth / 2

    this.dom = null;
    this.setUpDom();
  }

  setDelay(delay) {
    this.delay = delay;
  }
  setNoOfBets(noOfBets) {
    this.noOfBets = noOfBets;
  }
  setUpTestDom() {
    const existingSimulatorDiv = document.getElementById("simulatorTestDiv");
    if (existingSimulatorDiv) {
      existingSimulatorDiv.remove();
    }
    const simulatorDiv = document.createElement("div");
    simulatorDiv.id = "simulatorTestDiv";
    simulatorDiv.style.position = "fixed";
    simulatorDiv.style.top = "30px";
    simulatorDiv.style.left = "30px";
    simulatorDiv.style.padding = "20px";
    simulatorDiv.style.backgroundColor = "black";
    simulatorDiv.style.border = "1px solid green";
    simulatorDiv.style.color = "green";
    simulatorDiv.style.zIndex = "1000";
    simulatorDiv.style.width = "500px";
    simulatorDiv.innerHTML = `<h3>Test simulator</h3>`;
    const input = document.createElement("input");
    input.id = "simulatorInput";
    input.placeholder = "index of multiplier [0 - " + this.rows + "]";
    input.type = "text";
    input.style.width = "100%";
    input.style.marginTop = "10px";
    input.value = "6";
    simulatorDiv.appendChild(input);

    const button = document.createElement("button");
    button.id = "simulatorButton";
    button.innerText = "Drop Ball";
    button.style.width = "100%";

    button.onclick = () => {
      const index = parseInt(input.value);
      if (isNaN(index) || index < 0 || index > this.rows) {
        alert("Please enter a valid index between 0 and " + this.rows);
        return;
      }
      const data = map.filter((elem) => elem.rows == this.rows)[0];
      let record = data.records[index];
      const randomPathIndex = parseInt(0 + Math.random() * (record.length - 1));
      record = record[randomPathIndex];

      this.BallManager.addBall({
        xPos: record.initialX,
        yPos: record.initialY,
      });
    };
    simulatorDiv.appendChild(button);

    button.click();

    document.body.appendChild(simulatorDiv);
  }
  setUpDom() {
    const existingSimulatorDiv = document.getElementById("simulatorDiv");
    if (existingSimulatorDiv) {
      existingSimulatorDiv.remove();
    }
    const simulatorDiv = document.createElement("div");
    this.dom = simulatorDiv;
    simulatorDiv.id = "simulatorDiv";
    simulatorDiv.style.position = "fixed";
    simulatorDiv.style.top = "30px";
    simulatorDiv.style.left = "30px";
    simulatorDiv.style.padding = "20px";
    simulatorDiv.style.backgroundColor = "black";
    simulatorDiv.style.border = "1px solid green";
    simulatorDiv.style.color = "green";
    simulatorDiv.style.zIndex = "1000";
    simulatorDiv.style.width = "500px";
    simulatorDiv.innerHTML = `<h3>Starting simulator ....</h3>`;

    document.body.appendChild(simulatorDiv);
  }
  updateDom({
    currentBet,
    dropX,
    dropY,
    successfulDrops,
    unSuccessfulDrops,
    records,
  }) {
    if (this.dom) {
      this.dom.innerHTML = `
        <h2>Simulator running: ${currentBet} / ${this.noOfBets}</h2>
        Dropping ball at (x: ${dropX.toFixed(2)}, y: ${dropY.toFixed(2)})<br/>
        Successful Drops: ${successfulDrops} <br/>
        Unsuccessful Drops: ${unSuccessfulDrops} <br/>
        rows: ${this.rows} <br/>
        recorded multipliers: ${Object.keys(records).length}/${
        this.rows + 1
      }<br/>
        <h3>Records:</h3>
        <div style="height:70vh;overflow-y:scroll;">${JSON.stringify(
          records
        )}</div>
      `;
    }
  }
  async replay(row) {
    const rowIndexMap = {
      16: 0,
      15: 1,
      14: 2,
      13: 3,
      12: 4,
      11: 5,
      10: 6,
      9: 7,
      8: 8,
    };
    let i = 1;
    let isRunning = true;

    // iterate over every path for every multiplier
    Object.keys(map[rowIndexMap[row]].records).forEach((multiplierIndex) => {
      const paths = map[rowIndexMap[row]].records[multiplierIndex];
      paths.forEach((path, index) => {
        this.BallManager.addBall({ xPos: path.initialX, yPos: path.initialY });

        // wait for ball to complete it's path
        const waitForSettle = setInterval(() => {
          if (this.BallManager.balls.length === 0 && !isRunning) {
            clearInterval(waitForSettle);
          }
        }, 200);
      });
    });
  }

  async simulate() {
    for (let i = 0; i < this.noOfBets; i++) {
      const x =
        this.canvasWidth / 2 +
        -this.lowX +
        Math.random() * (this.lowX + this.highX);
      const y = 30;

      this.updateDom({
        currentBet: i + 1,
        dropX: x,
        dropY: y,
        successfulDrops: this.BallManager.successfulDrops,
        unSuccessfulDrops: this.BallManager.unSuccessfulDrops,
        records: this.BallManager.record,
      });
      this.simulationData.records = this.BallManager.record;
      await new Promise((resolve) => setTimeout(resolve, this.delay * 1000));
      this.BallManager.addBall({ xPos: x, yPos: y });
    }

    // if main thread is free wait for all balls to settle
    const waitForSettle = setInterval(() => {
      if (this.BallManager.balls.length === 0) {
        this.updateDom({
          currentBet: this.noOfBets,
          dropX: 0,
          dropY: 0,
          successfulDrops: this.BallManager.successfulDrops,
          unSuccessfulDrops: this.BallManager.unSuccessfulDrops,
          records: this.BallManager.record,
        });
        this.simulationData.records = this.BallManager.record;
        clearInterval(waitForSettle);
      } else {
        this.updateDom({
          currentBet: this.noOfBets,
          dropX: 0,
          dropY: 0,
          successfulDrops: this.BallManager.successfulDrops,
          unSuccessfulDrops: this.BallManager.unSuccessfulDrops,
          records: this.BallManager.record,
        });
        this.simulationData.records = this.BallManager.record;
      }
    }, 1000);

    console.log("Simulation Data:", this.simulationData);
    localStorage.setItem(
      "plinko_simulation_data",
      JSON.stringify(this.simulationData)
    );
  }
}
