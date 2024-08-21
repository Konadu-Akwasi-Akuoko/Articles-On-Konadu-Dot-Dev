# Maximum Points You Can Obtain from Cards - LeetCode 1423

Published on August 19, 2024

![Maximum Points You Can Obtain from Cards - LeetCode 1423](https://cdn.sanity.io/images/ok7qsbpm/production/aea16a9194274aad88e0086ff5c734115bbede74-1692x1024.png?q=75&fit=clip&auto=format&fm=webp)

A brand new Monday, let's torture ourselves a little bit, with this leetcode problem. Last week was a week of [learning redux](https://konadu.dev/ngrx-redux-is-not-hard-it-is-because-you-dont-understand-the-patterns) and learning [how to write tests.](https://konadu.devarticles/series/testing-in-angular)

## The problem

There are several cards **arranged in a row**, and each card has an associated number of points. The points are given in the integer array `cardPoints`.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly `k` cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array `cardPoints` and the integer `k`, return the _maximum score_ you can obtain.

### Example 1



**Input:** `cardPoints = [1, 2, 3, 4, 5, 6, 1]`, `k = 3`  
**Output:** `12`

#### Explanation

1. **Initial Setup:** 
  * You can pick cards from either end of the array.
  * Your goal is to maximize the sum of the `k` cards you pick.
2. **Strategy:** 
  * To maximize the score, you need to consider the sum of the cards you can pick from both ends.
  * Here, `k = 3`, so you need to pick 3 cards.
3. **Possible Choices:**  
  * You can pick the first 3 cards: `[1, 2, 3]` → Sum = `1 + 2 + 3 = 6`
  * You can pick the last 3 cards: `[5, 6, 1]` → Sum = 5` + 6 + 1 = 12`
  * You can pick 2 cards from the start and 1 from the end: `[1, 2, 1]` → Sum = `1 + 2 + 1 = 4`
  * You can pick 1 card from the start and 2 from the end: `[1, 6, 1]` → Sum = `1 + 6 + 1 = 8`
4. **Optimal Choice:**
  * The optimal strategy is to pick the last 3 cards: `[6, 5, 1]` → Sum = `6 + 5 + 1 = 12`

### **Example 2**

Input: cardPoints = [2,2,2], k = 2  
Output: 4  
Explanation: Regardless of which two cards you take, your score will always be 4.  


### **Example 3**

Input: cardPoints = [9,7,7,9,7,7,9], k = 7  
Output: 55  
Explanation: You have to take all the cards. Your score is the sum of points of all cards.

## **Constraints**

* `1 <= cardPoints.length <= 105`
* `1 <= cardPoints[i] <= 104`
* `1 <= k <= cardPoints.length`

## Intuition

This problem can be approached using a sliding window technique.

## Approach

Initially, I thought of using a typical sliding window algorithm to take `k` cards at a time from the start of the array to the end. However, the problem requires taking exactly `k` cards from either the beginning or the end of the array.

Upon re-reading the problem statement, I realized that we need to consider the following:

1. Take a contiguous subarray of length `k` from the start.
2. Take a contiguous subarray of length `k` from the end.
3. Take some cards from the beginning and some from the end to form a total of `k` cards.

To solve this, we:

1. Calculate the sum of the first `k` cards.
2. Use a sliding window to replace cards from the beginning with cards from the end, one by one, and keep track of the maximum sum.

## Complexity

* **Time complexity**:  
The first loop takes `k` steps, and the second loop also takes `k` steps, resulting in a total time complexity of `O(2k)`, which simplifies to `O(k)`.
* **Space complexity**:  
The space complexity is `O(1)` because the space used by the algorithm does not depend on the size of the input array.

```undefined
function maxScore(cardPoints: number[], k: number): number {
    let n = cardPoints.length; // Get the length of the cardPoints array
    let currentSum = 0; // Initialize currentSum to store the sum of the first k cards

    // Calculate the sum of the first k cards (initial sliding window)
    for (let i = 0; i < k; i++) {
        currentSum += cardPoints[i];
    }

    let maxNum = currentSum; // Initialize maxNum to the sum of the first k cards

    // Use a sliding window to replace cards from the beginning with cards from the end
    for (let i = 0; i < k; i++) {
        // Update currentSum by removing the card from the beginning and adding the card from the end
        currentSum = (currentSum - cardPoints[k - 1 - i]) + cardPoints[n - 1 - i];
        // Update maxNum if the new currentSum is greater
        maxNum = currentSum > maxNum ? currentSum : maxNum;
    }

    return maxNum; // Return the maximum sum of k cards
}

```

Hey 👋, I believe you enjoyed this shortie (it serves as a note to my future self 😎) and learned something new and valuable. Learn more about [OOP Classes here](https://konadu.devintroduction-to-oop-classes). 

You can also follow me on [Twitter (or instead X 😂)](https://twitter.com/akuoko_konadu) as I share more tips and tricks to make you improve as a better software engineer.

Until then, happy coding!