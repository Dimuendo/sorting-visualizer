///////////////////////////////////////////////////////////////////////////////
//                              MERGE SORT                                   //
///////////////////////////////////////////////////////////////////////////////

class AnimationMerge {
    constructor(compare, overwrite, type) {
        this.compare = compare;
        this.overwrite = overwrite;
        this.type = type;
    }
}

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
    let animationMerge;

	while (l < leftLength && r < rightLength) {
        animationMerge = new AnimationMerge([left[l].currIndex, right[r].currIndex], 0, 'compare');
        animationsMerge.push(animationMerge);
		if (left[l].value < right[r].value) {
            animationMerge = new AnimationMerge(0, [currIndex, left[l].value], 'overwrite');
            animationsMerge.push(animationMerge);
            left[l].currIndex = currIndex;
            currIndex++;
            sortedArr.push(left[l]);
			l++;
		} else {
            animationMerge = new AnimationMerge(0, [currIndex, right[r].value], 'overwrite');
            animationsMerge.push(animationMerge);
            right[r].currIndex = currIndex;
            currIndex++;
			sortedArr.push(right[r]);
			r++;
        }
	}

	while (l < leftLength) {
        left[l].currIndex = currIndex;
        animationMerge = new AnimationMerge(0, [currIndex, left[l].value], 'overwrite');
        animationsMerge.push(animationMerge);
        currIndex++;
		sortedArr.push(left[l]);
		l++;
	}

	while (r < rightLength) {
        right[r].currIndex = currIndex;
        animationMerge = new AnimationMerge(0, [currIndex, right[r].value], 0, 'overwrite');
        animationsMerge.push(animationMerge);
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
    constructor(compare, swap, choosePivot, choosePartition, type) {
        this.compare = compare;
        this.swap = swap;
        this.choosePivot = choosePivot;
        this.choosePartition = choosePartition;
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

    animationQuick = new AnimationQuick(0, 0, pivot, 0, 'choosePivot');
    animationsQuick.push(animationQuick);
    animationQuick = new AnimationQuick(0, 0, 0, partitionIndex, 'choosePartition');
    animationsQuick.push(animationQuick);

    for (let i = low; i < high; i++) {
        animationQuick = new AnimationQuick(i, 0, 0, 0, 'compare');
        animationsQuick.push(animationQuick);
        if (rects[i].value < pivotValue.value) {
            if (i === partitionIndex) {
                partitionIndex++;
                continue;
            }
            animationQuick = new AnimationQuick(0, [i, partitionIndex], 0, 0, 'swap');
            animationsQuick.push(animationQuick);
            swap(rects, i, partitionIndex);
            partitionIndex++;
            animationQuick = new AnimationQuick(0, 0, 0, partitionIndex, 'choosePartition');
            animationsQuick.push(animationQuick);
        }
    }
    animationQuick = new AnimationQuick(0, [high, partitionIndex], 0, 0, 'swap');
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
    constructor(compare, swap, chooseMin, type) {
        this.compare = compare;
        this.swap = swap;
        this.chooseMin = chooseMin;
        this.type = type;
    }
}

export function selectionSort(rects) {
    const animationsSelect = [];
    selectionSortHelper(rects, animationsSelect);
    return animationsSelect;
}

export function selectionSortHelper(rects, animationsSelect) {
    let minIndex = -1;
    let len = rects.length;
    let animationSelect;
    let lastMin;

    for (let i = 0; i < len; i++) {
        lastMin = minIndex;
        minIndex = i;
        animationSelect = new AnimationSelect(0, 0, [lastMin, minIndex], 'chooseMin');
        animationsSelect.push(animationSelect);
        for (let j = i + 1; j < len; j++) {
            animationSelect = new AnimationSelect(j, 0, 0, 'compare');
            animationsSelect.push(animationSelect);
            if (rects[j].value < rects[minIndex].value) {
                lastMin = minIndex;
                minIndex = j;
                animationSelect = new AnimationSelect(0, 0, [lastMin, minIndex], 'chooseMin');
                animationsSelect.push(animationSelect);
            }
        }
        animationSelect = new AnimationSelect(0, [i, minIndex], 0, 'swap');
        animationsSelect.push(animationSelect);
        swap(rects, i, minIndex);
    }
    return rects;
}

///////////////////////////////////////////////////////////////////////////////
//                              USEFUL FUNCTIONS                             //
///////////////////////////////////////////////////////////////////////////////
function swap(rects, i, j) {
    const tempIndex = rects[i].currIndex;
    rects[i].currIndex = rects[j].currIndex;
    rects[j].currIndex = tempIndex;

    const temp = rects[i];
    rects[i] = rects[j];
    rects[j] = temp;
}
