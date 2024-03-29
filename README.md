# rePoll

Link to this repo: https://github.com/ernisn/repoll

This is the redo of [ernisn/Polly](https://github.com/ernisn/polly) 

Totally redesigned and implemented without the usage of extra external libraries.

Based on [laaksoharju/Polly@20220611](https://github.com/laaksoharju/polly)

---

## Data Structure

The data structure was rewritten as below:

```javascript
allPolls
// Previously "polls", object
allPolls[pollId]
// Each poll, object
// Defined as "currentPoll" in each function (Previously called "poll")

	allPolls[pollId].lang
	// Language of the poll, string

	allPolls[pollId].pollItems
	// All poll items, array
	allPolls[pollId].pollItems[itemId]
	// One poll item including questions and answers (Previously called "question"), object

		allPolls[pollId].pollItems[itemId].itemQuestion
		// The only 1 question in this poll item, string
		allPolls[pollId].pollItems[itemId].itemAnswers
		// All the created preset answers in this poll item, array

			allPolls[pollId].pollItems[itemId].itemAnswers[answerId]
			// The answer content with the answerId in this array, string

	allPolls[pollId].votersResponds
	// Count voters responds of a certain answer, 2 dimensional array
		allPolls[pollId].votersResponds[itemId][answerId]
		// How many times this answer was chosen, number
		// Example: votersResponds[2][1]=3 means under Question2 the Answer1 was voted 3 times

```

Example:

```javascript
{
    pollId1: {   // This is a poll
        lang: 'en',
        pollItems: [
            {   // This is item 1
                itemQuestion: 'This is question 1',
                itemAnswers: [
                    'Answer 1 to this question',
                    'Answer 2 to this question'
                ]
            },
            {   // This is item 2
                itemQuestion: 'This is question 2',
                itemAnswers: [
                    'Answer 1 to this question',
                    'Answer 2 to this question',
                    'Answer 3 to this question'
                ]
            }
        ],
        votersResponds: [
            [2, 0],
            [1, 1, 3]   // Values are the vote counters
        ]
    },

    pollId2: {   // This is another poll
        lang: 'sv',
        pollItems: [
            {
                itemQuestion: 'This is question 1',
                itemAnswers: [
                    'Answer 1 to this question',
                    'Answer 2 to this question'
                ]
            }
        ],
        votersResponds: [
            [1, 1],
        ]
    }
}
```
---

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
