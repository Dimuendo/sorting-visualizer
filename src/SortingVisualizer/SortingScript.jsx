import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgs from '../SortingAlgorithms/sortingAlgs';

const ANIMATION_SPEED = 1;
const BAR_WIDTH = 20;
const ORIGINAL_COLOUR = 'darkviolet';
const SCREEN_WIDTH = window.innerWidth;
const NUM_RECTS = (SCREEN_WIDTH) / (BAR_WIDTH);

class Rectangle {
    constructor(value, currIndex) {
        this.value = value;
        this.currIndex = currIndex;
    }
}

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rects: [],
        };
    }

    componentDidMount() {
        this.resetRects();
    }

    resetRects() {
        const rects = [];
        const screenHeight = window.innerHeight;
        for (let i = 0; i < NUM_RECTS; i++) {
            let rand = randValue(10, screenHeight - 100);
            let tempRect = new Rectangle(rand, i);
            rects.push(tempRect);
        }
        this.setState({rects});
    }

    resetRectIndices(rectsIn) {
        const values = [];
        for (let i = 0; i < rectsIn.length; i++) {
            values.push(rectsIn[i].value)
        }
        const rects = [];
        for (let i = 0; i < values.length; i++) {
            let tempRect = new Rectangle(values[i], i);
            rects.push(tempRect);
        }
        this.setState({rects});
    }

    lockButtons() {
        let blockColour = 'gray';

        let generateButton = document.getElementById('generate-nums');
        generateButton.disabled = true;
        generateButton.style.color = blockColour;
        
        let mergeButton = document.getElementById('merge-sort');
        mergeButton.disabled = true;
        mergeButton.style.color = blockColour;

        let quickButton = document.getElementById('quick-sort');
        quickButton.disabled = true;
        quickButton.style.color = blockColour;
        
        let bubbleButton = document.getElementById('bubble-sort');
        bubbleButton.disabled = true;
        bubbleButton.style.color = blockColour;

        let selectButton =  document.getElementById('selection-sort');
        selectButton.disabled = true;
        selectButton.style.color = blockColour;
    }

    resetButtons() {
        let unblockedColour = 'white';

        let generateButton = document.getElementById('generate-nums');
        generateButton.disabled = false;
        generateButton.style.color = unblockedColour;
        
        let mergeButton = document.getElementById('merge-sort');
        mergeButton.disabled = false;
        mergeButton.style.color = unblockedColour;

        let quickButton = document.getElementById('quick-sort');
        quickButton.disabled = false;
        quickButton.style.color = unblockedColour;
        
        let bubbleButton = document.getElementById('bubble-sort');
        bubbleButton.disabled = false;
        bubbleButton.style.color = unblockedColour;

        let selectButton =  document.getElementById('selection-sort');
        selectButton.disabled = false;
        selectButton.style.color = unblockedColour;
    }

    mergeSort() {
        const animationsMerge = sortingAlgs.mergeSort(this.state.rects);
        this.lockButtons();
        let animationTimer = 0;
        const rectList = document.getElementsByClassName('rect');
        for (let i = 0; i < animationsMerge.length; i++) {
            
            const colourChange = i % 3 !== 2;
            if (colourChange) {
                const [rectOneIndex, rectTwoIndex] = animationsMerge[i];
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                let colour = ORIGINAL_COLOUR;
                if (i % 3 === 0) {
                    colour = 'red';
                } else {
                    colour = ORIGINAL_COLOUR;
                }
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colour;
                    rectTwoStyle.backgroundColor = colour;
                }, animationTimer * ANIMATION_SPEED);
                animationTimer++;
            } else {
                setTimeout(() => {
                    const [rectOneIndex, newHeight] = animationsMerge[i];
                    const rectOneStyle = rectList[rectOneIndex].style;
                    rectOneStyle.height = `${newHeight}px`;
                }, animationTimer * ANIMATION_SPEED);
                animationTimer++;
            }
        }

        setTimeout(() => {
            const sortedRects = sortingAlgs.mergeSortHelper(this.state.rects, []);
            this.resetRectIndices(sortedRects);
            this.resetButtons();
        }, (animationTimer + 1) * ANIMATION_SPEED);
    }

    quickSort() {
        const animationsQuick = sortingAlgs.quickSort(this.state.rects);
        this.lockButtons();
        let animationTimer = 0;

        for (let i = 0; i < animationsQuick.length; i++) {
            const rectList = document.getElementsByClassName('rect');
            const aniType = animationsQuick[i].type;

            if (aniType === 'compare') {
                const [rectOneIndex, rectTwoIndex] = animationsQuick[i].compare;
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                let colour = 'red';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colour;
                    rectTwoStyle.backgroundColor = colour;
                }, animationTimer * ANIMATION_SPEED);
                animationTimer++;
                setTimeout(() => {
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                    rectTwoStyle.backgroundColor = ORIGINAL_COLOUR;
                }, animationTimer * ANIMATION_SPEED);
                animationTimer++
            } else if (aniType === 'swap') {
                const [rectOneIndex, rectTwoIndex] = animationsQuick[i].swap;
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                let colour = 'yellow';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colour;
                    rectTwoStyle.backgroundColor = colour;
                }, animationTimer * ANIMATION_SPEED);
                animationTimer++
                setTimeout(() => {
                    const tempHeight = rectOneStyle.height;
                    rectOneStyle.height = rectTwoStyle.height;
                    rectTwoStyle.height = tempHeight;
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                    rectTwoStyle.backgroundColor = ORIGINAL_COLOUR;
                }, animationTimer * ANIMATION_SPEED);
                animationTimer++
            }
        }

        setTimeout(() => {
            this.resetRectIndices(this.state.rects);
            this.resetButtons();
        }, (animationTimer + 1) * ANIMATION_SPEED);
    }

    bubbleSort() {
        const animationsBub = sortingAlgs.bubbleSort(this.state.rects);
        this.lockButtons();
        let animationTimer = 0;

        for (let i = 0; i < animationsBub.length; i++) {
            const rectList = document.getElementsByClassName('rect');
            const aniType = animationsBub[i].type;

            if (aniType === 'compare') {
                const [rectOneIndex, rectTwoIndex] = animationsBub[i].compare;
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                let colour = 'red';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colour;
                    rectTwoStyle.backgroundColor = colour;
                }, animationTimer * ANIMATION_SPEED);
                setTimeout(() => {
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                    rectTwoStyle.backgroundColor = ORIGINAL_COLOUR;
                }, (animationTimer + 2) * ANIMATION_SPEED);
                animationTimer += 3;
            } else if (aniType === 'swap') {
                const [rectOneIndex, rectTwoIndex] = animationsBub[i].swap;
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                setTimeout(() => {
                    const tempHeight = rectOneStyle.height;
                    rectOneStyle.height = rectTwoStyle.height;
                    rectTwoStyle.height = tempHeight;
                }, animationTimer * ANIMATION_SPEED);
                animationTimer += 1;
            }
        }

        setTimeout(() => {
            this.resetRectIndices(this.state.rects);
            this.resetButtons();
        }, (animationTimer + 1) * ANIMATION_SPEED);
    }

    selectionSort() {
        const animationsBub = sortingAlgs.bubbleSort(this.state.rects);
        this.lockButtons();
        let animationTimer = 0;

        for (let i = 0; i < animationsBub.length; i++) {
            const rectList = document.getElementsByClassName('rect');
            const aniType = animationsBub[i].type;

            if (aniType === 'compare') {
                const [rectOneIndex, rectTwoIndex] = animationsBub[i].compare;
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                let colour = 'red';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colour;
                    rectTwoStyle.backgroundColor = colour;
                }, animationTimer * ANIMATION_SPEED);
                setTimeout(() => {
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                    rectTwoStyle.backgroundColor = ORIGINAL_COLOUR;
                }, (animationTimer + 5) * ANIMATION_SPEED);
                animationTimer += 6;
            } else if (aniType === 'swap') {
                const [rectOneIndex, rectTwoIndex] = animationsBub[i].swap;
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                setTimeout(() => {
                    const tempHeight = rectOneStyle.height;
                    rectOneStyle.height = rectTwoStyle.height;
                    rectTwoStyle.height = tempHeight;
                }, animationTimer * ANIMATION_SPEED);
                animationTimer += 1;
            }
        }

        setTimeout(() => {
            this.resetRectIndices(this.state.rects);
            this.resetButtons();
        }, (animationTimer + 1) * ANIMATION_SPEED);
    }

    testSort() {
        for (let i = 0; i < 1; i++) {
            //let testArrayOne = generateNums(10);
            //let testArrayTwo = [...testArrayOne];
        }
    
    }

    render() {
        const {rects} = this.state;
        return (
            <div className="container">
                <div className="options-bar">
                    <button id="generate-nums" onClick={() => this.resetRects()}> Generate Numbers  </button>
                    <button id="merge-sort" onClick={() => this.mergeSort()}> Merge Sort  </button>
                    <button id="quick-sort" onClick={() => this.quickSort()}> Quick Sort  </button>
                    <button id="bubble-sort" onClick={() => this.bubbleSort()}> Bubble Sort  </button>
                    <button id="selection-sort" onClick={() => this.selectionSort()}> Selection Sort  </button>
                </div>
                <div className="rect-container">
                    {rects.map((rect, index) => (
                        <div className="rect" key={index} style={{height: `${rect.value}px`}} >
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

function randValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateNums(howMany) {
    const nums = [];
        for (let i = 0; i < howMany; i++) {
            let rand = randValue(10, 1000);
            nums.push(rand);
        }
    return nums;
}

function arraysEqual(arrOne, arrTwo) {
    if (arrOne.length !== arrTwo.length) {
        console.log()
        return false;
    } else {
        for (let i = 0; i < arrOne.length; i++) {
            if (arrOne[i] !== arrTwo[i]) return false;
        }
    }
    return true;
}
