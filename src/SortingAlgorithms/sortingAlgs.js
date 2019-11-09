///////////////////////////////////////////////////////////////////////////////
//                              MERGE SORT                                   //
///////////////////////////////////////////////////////////////////////////////

export function mergeSort(rects) {
    const animationsMerge = [];
    rects = mergeSortHelper(rects, animationsMerge);
    console.log(rects);
    return animationsMerge;
}

export function mergeSortHelper(rects, animationsMerge) {
    let rectsLength = rects.length;
	if (rectsLength < 2) return rects;

	let mid = Math.floor(rectsLength / 2);
	let left = rects.slice(0, mid);
	let right = rects.slice(mid);

	return merge(mergeSortHelper(left, animationsMerge), mergeSortHelper(right, animationsMerge), animationsMerge);
}

function merge(left, right, animationsMerge) {
	let sortedArr = [];
	let leftLength = left.length;
	let rightLength = right.length;
	let l = 0;
	let r = 0;
    let currIndex = left[0].currIndex;

	while (l < leftLength && r < rightLength) {
        animationsMerge.push([left[l].currIndex, right[r].currIndex]);
        animationsMerge.push([left[l].currIndex, right[r].currIndex]);
		if (left[l].value < right[r].value) {
            animationsMerge.push([currIndex, left[l].value]);
            left[l].currIndex = currIndex;
            currIndex++;
            sortedArr.push(left[l]);
			l++;
		} else {
            animationsMerge.push([currIndex, right[r].value]);
            right[r].currIndex = currIndex;
            currIndex++;
			sortedArr.push(right[r]);
			r++;
        }
	}

	while (l < leftLength) {
        animationsMerge.push([left[l].currIndex, left[l].currIndex]);
        animationsMerge.push([left[l].currIndex, left[l].currIndex]);
        animationsMerge.push([currIndex, left[l].value]);
        left[l].currIndex = currIndex;
        currIndex++;
		sortedArr.push(left[l]);
		l++;
	}

	while (r < rightLength) {
        animationsMerge.push([right[r].currIndex, right[r].currIndex]);
        animationsMerge.push([right[r].currIndex, right[r].currIndex]);
        animationsMerge.push([currIndex, right[r].value]);
        right[r].currIndex = currIndex;
        currIndex++;
		sortedArr.push(right[r]);
		r++;
    }
    
	return sortedArr;
}

///////////////////////////////////////////////////////////////////////////////
//                              QUICK SORT                                   //
///////////////////////////////////////////////////////////////////////////////

class AnimationQuick {
    constructor(compare, swap, type) {
        this.compare = compare;
        this.swap = swap;
        this.type = type;
    }
}

export function quickSort(rects) {
    const animationsQuick = [];
    const rectsLength = rects.length - 1;
    
    quickSortHelper(rects, 0, rectsLength, animationsQuick);
    return animationsQuick;
}

function quickSortHelper(rects, low, high, animationsQuick) {
    let pivot;
    let partitionIndex;

    if (low < high) {
        pivot = high;
        partitionIndex = partition(rects, pivot, low, high, animationsQuick)

        quickSortHelper(rects, low, partitionIndex - 1, animationsQuick);
        quickSortHelper(rects, partitionIndex + 1, high, animationsQuick);
    }
    return rects;
}

function partition(rects, pivot, low, high, animationsQuick) {
    let pivotValue = rects[pivot];
    let partitionIndex = low;
    let animationQuick;

    for (let i = low; i < high; i++) {
        animationQuick = new AnimationQuick([i, pivot], 0, 'compare');
        animationsQuick.push(animationQuick);
        if (rects[i].value < pivotValue.value) {
            animationQuick = new AnimationQuick(0, [i, partitionIndex], 'swap');
            animationsQuick.push(animationQuick);
            swap(rects, i, partitionIndex);
            partitionIndex++;
        }
    }
    animationQuick = new AnimationQuick(0, [high, partitionIndex], 'swap');
    animationsQuick.push(animationQuick);
    swap(rects, high, partitionIndex);
    return partitionIndex;
}

///////////////////////////////////////////////////////////////////////////////
//                              BUBBLE SORT                                  //
///////////////////////////////////////////////////////////////////////////////

class AnimationBub {
    constructor(compare, swap, type) {
        this.compare = compare;
        this.swap = swap;
        this.type = type;
    }
}

export function bubbleSort(rects) {
    const animationsBub = [];
    bubbleSortHelper(rects, animationsBub);
    return animationsBub;
}

function bubbleSortHelper(rects, animationsBub) {
    let len = rects.length;
    let animationBub;
    for (let i = len - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            animationBub = new AnimationBub([j, j-1], 0, 'compare');
            animationsBub.push(animationBub);
            if (rects[j - 1].value > rects[j].value) {
                animationBub = new AnimationBub(0, [j, j-1], 'swap');
                animationsBub.push(animationBub);
                swap(rects, j-1, j);
            }
        }
    }
    return rects;
}

///////////////////////////////////////////////////////////////////////////////
//                              SELECTION SORT                               //
///////////////////////////////////////////////////////////////////////////////

class AnimationSelect {
    constructor(compare, swap, type) {
        this.compare = compare;
        this.swap = swap;
        this.type = type;
    }
}

export function selectionSort(rects) {
    const animationsBub = [];
    selectionSortHelper(rects, animationsBub);
    return animationsBub;
}

export function selectionSortHelper(rects, animationsSelect) {
    let minIndex;
    let len = rects.length;
    let animationSelect;

    for (let i = 0; i < len; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            animationSelect = new AnimationSelect([j, minIndex], 0, 'compare');
            animationsSelect.push(animationSelect);
            if (rects[j].value < rects[minIndex].value) {
                minIndex = j;
            }
        }
        animationSelect = new AnimationSelect(0, [i, minIndex], 'swap');
        animationsSelect.push(animationSelect);
        swap(rects, i, minIndex);
    }
    return rects;
}

///////////////////////////////////////////////////////////////////////////////
//                              USEFUL FUNCTIONS                             //
///////////////////////////////////////////////////////////////////////////////
function swap(rects, i, j) {
    // const tempIndex = rects[i].currIndex;
    // rects[i].currIndex = rects[j].currIndex;
    // rects[j].currIndex = tempIndex;

    const temp = rects[i];
    rects[i] = rects[j];
    rects[j] = temp;
}

function randValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

