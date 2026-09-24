![Swiggy](images/swiggy-logo.png)

# Tribe: A Foodie Community on Swiggy

2025

*Please note: This was a part of an assignment for a company. I am in the process of properly documenting and wireframing the features on Figma. Until then, feel free to get a basic gist!*

## Task

**You, as a PM, have to build a community of foodies on Swiggy.**

- What will the MVP look like? (Exact features, not generic ideas)
- What's the exact UX flow? (Step-by-step: Where do users start? What do they see? Where do they click? How do they come back? etc)

First and foremost, to ensure you know exactly what my thinking process is, I have left this document as unedited as possible. I have obviously tried to look at grammatical errors, but I haven't changed the ordering of any point to ensure you can understand my thought process!

## Users

- **Professionals** – Ideally 23 to 30 years old. Busy work life, and they don't have the time to cook food. This group relies on delivery for food intake.
- **College Students** – They want to eat good food, but are also on budget.
- **Family** – They either want to find good places to eat outside, or maybe look at bulk ordering for monthly groceries. Platforms like Zepto, BlinkIt, Swiggy Instamart etc.
- **Food Critiques** – Find out new restaurants/ cuisines to try out.
- **HRs/Community Leaders** – Find out places where they can host events and gatherings. Ideally looking at catering services and/or bulk ordering of food.

## What is some pain points they come across?

- High delivery costs
- Inaccuracy of orders that lead to dissatisfaction -> Inadequate customer support
- No reviews on restaurant food items to understand if a delicacy is good in that establishment.
- No food community present as of now, where food influencers can come together. Closest thing present is Instagram. Major food events that happen across India is probably Zomaland, Food Grub etc.

## Risks that should be considered for this community

- If a community is open up to general people, trolling, bullying, harsh/offensive words, and cyber offenses are only a minute away. Place strong protocols using models to ensure safety of users.
- This one is a little over the top – but sharing of videos and pictures of big and famous restaurants can easily fall in the wrong hands and cause terror – Mumbai Taj Attack. (Maybe nothing to a scale as big as that attack). Potential Solution – Restaurants can flag images/videos that they don't want appearing. If legitimate, remove them from the post.
- Certain Vegetarians and Vegans are very aversive to the idea of anything non vegetarian. Have a veg filter for said people.

## Features

### Interactive Feed

1. Have users upload images of food ordered and any comments they want to add. One way to organically increase use of Swiggy Dineout is in the initial rollout of the community, only let people who have booked the restaurant with Swiggy Dineout be allowed to post. It can slowly be rolled to normal users.
2. Recipe Sharing with the ability to link ingredients to Swiggy Instamart.
3. Polls and Challenges – Have timed activities like "Where is best biryani in Hyderabad?" and people can vote and insert pictures with location of the restaurant.

### Restaurant Specific Threads

1. Q&A section where users or restaurants answer queries.
2. "Must Try" dish section which is crowdsourced. [Users can also rate specific dishes they tried and have average stars shown (This will work better in the main swiggy application)].

### Gamification of the application

1. **Badges and Achievements** – Have milestones set. [If a user logs in 15 reviews, unlock an "Amateur Critique" badge for them, if user regularly interacts with sweet delicacies, award them "Sweetest Tooth" badge (can work on the wording).
2. **Monthly Leaderboards** – High interactive users (posts, polls, answers, recipes) can be given "Swiggy Supercoins" which translate to small discounts and promotions to specific restaurants or even award something as simple as membership for the next month.
3. **Challenges** – Have challenges of the month for community. For example, Juicy June (aimed to increase liquid intake during summers, share recipes that they make) or Dash December (aimed to share easy and quickly made food, since no one likes to leave their bed during winters).
4. **Wrapped** – "Flavor Finale", a Spotify wrapped but for Swiggy users – where they see their metrics like
   1. Favorite cuisines
   2. Most ordered dishes
   3. Preferred meal times
   4. Top 3 dishes
   5. Top 5 restaurants
   6. Number of restaurants they discovered
   7. Number of challenges they took a part in

I know this is very mainstream, but mainstreams always work. Note: Do NOT show total money spent, it will definitely result in a decrease of customer orders.

## UX Flow

There are many different ways to tackle the UX flow. The two most obvious ones are: creating a standalone application or integrating the new features into existing features.

Opening the Swiggy application once made it clear that the latter would be the best approach. Swiggy has different divisions: Food Delivery, Instamart, Dineout and Genie – all available from the same platform. It only makes sense to integrate community into it (Refer image)

![Swiggy Application - Home](images/swiggy-app-home.jpg)

*Swiggy Application - Home*

For this assignment, I am taking complete creative control of the application, and assuming all the ideas and flows presented are fully tested and sit down well in the ecosystem.

The UX Flow will be as follows, please refer to flowchart for a more structured representation:

- Instead of Reorder, we will have the community. I am calling it "Tribe".
- When Tribe is clicked, it redirects to a carousel type feed, where people can view posts that contain reviews from restaurants near them, or recipes from food bloggers they follow.
- The Navigation Bar of Tribe will have

1. **Search** – where they can search people and restaurants. The User will have their own page where all their posts, ratings and polls are visible. The Restaurants' page will be divided in three sections: posts (whatever people posted), delicacies rating (which can be searched) and Q&A about the establishment. Right below the name of the restaurant will be "Must Try" dish section that is crowdsourced.
2. **Home** – where all the carousel posts are present
3. **Challenge of the month** – where challenge of the month is shown, and if the user has opted into any other challenge, that is also shown below the current one.

- Badges and Achievements can be shown in the user profile from the main application. Other user's badges and achievements can be viewed when someone opens their user profile.

### UX Flow for Tribe

![UX Flow for Tribe](images/tribe-ux-flow.png)

*UX Flow for Tribe*
