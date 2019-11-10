import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgs from '../SortingAlgorithms/sortingAlgs';

const ORIGINAL_COLOUR = 'darkviolet';

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
            barWidth: 35,
            animationSpeed: 8,
        };

        this.updateRectSize = this.updateRectSize.bind(this);
        this.updateSpeed = this.updateSpeed.bind(this);
    }

    componentDidMount() {
        this.resetRects(this.state.barWidth * 10 + 2);
    }

    componentDidUpdate() {
        // Update the width of the all the rectangle elements when the number of rects change
        const rectList = document.getElementsByClassName('rect');
        for (let i = 0; i < rectList.length; i++) {
            rectList[i].style.width = `${this.state.barWidth}px`;
        }
    }

    resetRects(barWidth) {
        // Create rectangles based on screen size
        barWidth = Math.floor(((barWidth + 2) / 10) + 2);
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        let numRects = (screenWidth / barWidth) - 8;
        const rects = [];
        for (let i = 0; i < numRects; i++) {
            let rand = randValue(10, screenHeight - 100);
            let tempRect = new Rectangle(rand, i);
            rects.push(tempRect);
        }
        this.setState({rects: rects});
    }

    updateRectSize(event) {
        // Update the rectangle widths whenever the slider moves
        const sliderValue = event.target.value;
        this.setState({
            barWidth: sliderValue,
        });
        this.resetRects(sliderValue); 
    }

    updateSpeed(event) {
        // Update the animation speed whenever the slider moves
        const sliderValue = event.target.value;
        this.setState({animationSpeed: sliderValue});
    }

    resetRectIndices(rectsIn) {
        // After sorting the rectangles, update their index property
        const values = [];
        for (let i = 0; i < rectsIn.length; i++) {
            values.push(rectsIn[i].value)
        }
        const rects = [];
        for (let i = 0; i < values.length; i++) {
            let tempRect = new Rectangle(values[i], i);
            rects.push(tempRect);
        }
        this.setState({rects: rects});
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

        let selectButton = document.getElementById('selection-sort');
        selectButton.disabled = true;
        selectButton.style.color = blockColour;

        let sliders = document.getElementsByClassName('slider');
        for (let i = 0; i < sliders.length; i++) {
            sliders[i].disabled = true;
        }

        let sliderTexts = document.getElementsByClassName('slider-text');
        for (let i = 0; i < sliderTexts.length; i++) {
            sliderTexts[i].style.color = blockColour;
        }
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

        let selectButton = document.getElementById('selection-sort');
        selectButton.disabled = false;
        selectButton.style.color = unblockedColour;

        let sliders = document.getElementsByClassName('slider');
        for (let i = 0; i < sliders.length; i++) {
            sliders[i].disabled = false;
        }

        let sliderTexts = document.getElementsByClassName('slider-text');
        for (let i = 0; i < sliderTexts.length; i++) {
            sliderTexts[i].style.color = unblockedColour;
        }
    }

    mergeSort(animationSpeed) {
        // Get the animations assoicated with the sort
        const animationsMerge = sortingAlgs.mergeSort(this.state.rects);
        this.lockButtons();
        let animationTimer = 0;
        
        // Loop through the animations
        for (let i = 0; i < animationsMerge.length; i++) {
            const rectList = document.getElementsByClassName('rect');
            const aniType = animationsMerge[i].type;
            
            // If it's a comparison, colour the two rectangles red then colour them back to original
            if (aniType === 'compare') {
                const [rectOneIndex, rectTwoIndex] = animationsMerge[i].compare;
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                let colour = 'red';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colour;
                    rectTwoStyle.backgroundColor = colour;
                }, animationTimer * animationSpeed);
                animationTimer++;
                setTimeout(() => {
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                    rectTwoStyle.backgroundColor = ORIGINAL_COLOUR;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
            
            // If it's an overwrite, change the height of the rectangle at the index given
            } else if (aniType === 'overwrite') {
                const [rectOneIndex, newHeight] = animationsMerge[i].overwrite;
                const rectOneStyle = rectList[rectOneIndex].style;
                const colour = 'darkblue';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colour;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colour;
                    rectOneStyle.height = `${newHeight}px`;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
                setTimeout(() => {
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
            }
        }

        // Unlock the buttons once the animations are done
        setTimeout(() => {
            const sortedRects = sortingAlgs.mergeSortHelper(this.state.rects, []);
            this.resetRectIndices(sortedRects);
            this.resetButtons();
        }, (animationTimer + 1) * animationSpeed);
    }

    quickSort(animationSpeed) {
        const animationsQuick = sortingAlgs.quickSort(this.state.rects);
        this.lockButtons();
        let animationTimer = 0;

        for (let i = 0; i < animationsQuick.length; i++) {
            const rectList = document.getElementsByClassName('rect');
            const aniType = animationsQuick[i].type;

            // If it's a comparison, colour the rectangle red (the rect we are comparing against is the pivot)
            if (aniType === 'compare') {
                const rectOneIndex = animationsQuick[i].compare;
                const rectOneStyle = rectList[rectOneIndex].style;
                const colour = 'red';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colour;
                }, animationTimer * animationSpeed);
                animationTimer++;
                setTimeout(() => {
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                }, (animationTimer + 5) * animationSpeed);
                animationTimer += 6;

            // If it's a swap, colour the two rectangles, swap their heights, colour them back to original
            } else if (aniType === 'swap') {
                const [rectOneIndex, rectTwoIndex] = animationsQuick[i].swap;
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                const colourOne = 'darkblue';
                const colourTwo = 'blue';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colourOne;
                    rectTwoStyle.backgroundColor = colourTwo;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
                setTimeout(() => {
                    const tempHeight = rectOneStyle.height;
                    rectOneStyle.height = rectTwoStyle.height;
                    rectTwoStyle.height = tempHeight;
                    rectOneStyle.backgroundColor = colourTwo;
                    rectTwoStyle.backgroundColor = colourOne;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
                setTimeout(() => {
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                    rectTwoStyle.backgroundColor = ORIGINAL_COLOUR;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;

            // If we are choosing a pivot, colour the pivot red
            } else if (aniType === 'choosePivot') {
                const pivotRectIndex = animationsQuick[i].choosePivot;
                const pivotRectStyle = rectList[pivotRectIndex].style;
                const colour = 'red';
                setTimeout(() => {
                    pivotRectStyle.backgroundColor = colour;
                }, animationTimer * animationSpeed);
                animationTimer++;

            // If we are choosing a partition, colour the partition black
            } else if (aniType === 'choosePartition') {
                const partitionRectIndex = animationsQuick[i].choosePartition;
                const partitionRectStyle = rectList[partitionRectIndex].style;
                const colour = 'black';
                setTimeout(() => {
                    partitionRectStyle.backgroundColor = colour;
                }, animationTimer * animationSpeed);
                animationTimer++;
            }
        }

        // Unlock the buttons once the animations are done
        setTimeout(() => {
            this.resetRectIndices(this.state.rects);
            this.resetButtons();
        }, (animationTimer + 1) * animationSpeed);
    }

    bubbleSort(animationSpeed) {
        const animationsBub = sortingAlgs.bubbleSort(this.state.rects);
        this.lockButtons();
        let animationTimer = 0;

        for (let i = 0; i < animationsBub.length; i++) {
            const rectList = document.getElementsByClassName('rect');
            const aniType = animationsBub[i].type;

            // If it's a comparison, colour the two rectangles red then colour them back to original
            if (aniType === 'compare') {
                const [rectOneIndex, rectTwoIndex] = animationsBub[i].compare;
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                let colour = 'red';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colour;
                    rectTwoStyle.backgroundColor = colour;
                }, animationTimer * animationSpeed);
                animationTimer++;
                setTimeout(() => {
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                    rectTwoStyle.backgroundColor = ORIGINAL_COLOUR;
                }, (animationTimer + 5) * animationSpeed);
                animationTimer += 5;

            // If it's a swap, colour the two rectangles, swap their heights, colour them back to original
            } else if (aniType === 'swap') {
                const [rectOneIndex, rectTwoIndex] = animationsBub[i].swap;
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                const colourOne = 'darkblue';
                const colourTwo = 'blue';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colourOne;
                    rectTwoStyle.backgroundColor = colourTwo;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
                setTimeout(() => {
                    const tempHeight = rectOneStyle.height;
                    rectOneStyle.height = rectTwoStyle.height;
                    rectTwoStyle.height = tempHeight;
                    rectOneStyle.backgroundColor = colourTwo;
                    rectTwoStyle.backgroundColor = colourOne;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
                setTimeout(() => {
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                    rectTwoStyle.backgroundColor = ORIGINAL_COLOUR;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
            }
        }

        // Unlock the buttons once the animations are done
        setTimeout(() => {
            this.resetRectIndices(this.state.rects);
            this.resetButtons();
        }, (animationTimer + 1) * animationSpeed);
    }

    selectionSort(animationSpeed) {
        const animationsSelect = sortingAlgs.selectionSort(this.state.rects);
        this.lockButtons();
        let animationTimer = 0;

        for (let i = 0; i < animationsSelect.length; i++) {
            const rectList = document.getElementsByClassName('rect');
            const aniType = animationsSelect[i].type;

            // If it's a comparison, colour the two rectangles red then colour them back to original
            if (aniType === 'compare') {
                const rectOneIndex = animationsSelect[i].compare;
                const rectOneStyle = rectList[rectOneIndex].style;
                const colour = 'red';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colour;
                }, animationTimer * animationSpeed);
                animationTimer++;
                setTimeout(() => {
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                }, (animationTimer + 5) * animationSpeed);
                animationTimer += 6;

            // If we are the updating the min, colour the new min black and colour the previous min back to original
            } else if (aniType === 'chooseMin') {
                const [lastMinIndex, currMinIndex] = animationsSelect[i].chooseMin;
                const currMinRectStyle = rectList[currMinIndex].style;
                const colour = 'black';
                if (lastMinIndex >= 0) {
                    const lastMinRectStyle = rectList[lastMinIndex].style;
                    setTimeout(() => {
                        lastMinRectStyle.backgroundColor = ORIGINAL_COLOUR;
                        currMinRectStyle.backgroundColor = colour;
                    }, (animationTimer) * animationSpeed);
                    animationTimer++;
                } else {
                    setTimeout(() => {
                        currMinRectStyle.backgroundColor = colour;
                    }, (animationTimer) * animationSpeed);
                }

            // If it's a swap, colour the two rectangles, swap their heights, colour them back to original
            } else if (aniType === 'swap') {
                const [rectOneIndex, rectTwoIndex] = animationsSelect[i].swap;
                const rectOneStyle = rectList[rectOneIndex].style;
                const rectTwoStyle = rectList[rectTwoIndex].style;
                const colourOne = 'darkblue';
                const colourTwo = 'blue';
                setTimeout(() => {
                    rectOneStyle.backgroundColor = colourOne;
                    rectTwoStyle.backgroundColor = colourTwo;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
                setTimeout(() => {
                    const tempHeight = rectOneStyle.height;
                    rectOneStyle.height = rectTwoStyle.height;
                    rectTwoStyle.height = tempHeight;
                    rectOneStyle.backgroundColor = colourTwo;
                    rectTwoStyle.backgroundColor = colourOne;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
                setTimeout(() => {
                    rectOneStyle.backgroundColor = ORIGINAL_COLOUR;
                    rectTwoStyle.backgroundColor = ORIGINAL_COLOUR;
                }, (animationTimer + 10) * animationSpeed);
                animationTimer += 11;
            }
        }

        // Unlock the buttons once the animations are done
        setTimeout(() => {
            this.resetRectIndices(this.state.rects);
            this.resetButtons();
        }, (animationTimer + 1) * animationSpeed);
    }

    render() {
        const {rects} = this.state;
        return (
            <div className="container">
                <div className="options-bar">
                    <button id="generate-nums" onClick={() => this.resetRects(this.state.barWidth * 10 + 2)}> Generate Numbers  </button>
                    <div className="slide-container">
                        <p className="slider-text">Set Array Size: </p>
                        <input type="range" id="num-slider" min="20" max="50" step="1" defaultValue={this.state.barWidth} className="slider" onChange={this.updateRectSize}></input>
                        <p className="slider-text">Set Animation Speed: </p>
                        <input type="range" id="speed-slider" min="1" max="15" step="1" defaultValue={this.state.animationSpeed} className="slider" onChange={this.updateSpeed}></input>
                    </div>
                    <button id="quick-sort" onClick={() => this.quickSort(this.state.animationSpeed)}> Quick Sort  </button>
                    <button id="bubble-sort" onClick={() => this.bubbleSort(this.state.animationSpeed)}> Bubble Sort  </button>
                    <button id="merge-sort" onClick={() => this.mergeSort(this.state.animationSpeed)}> Merge Sort  </button>
                    <button id="selection-sort" onClick={() => this.selectionSort(this.state.animationSpeed)}> Selection Sort  </button>
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
