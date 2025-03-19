import { autoCompletePlace } from "../../models/AutoCompletePlace";
import { Review } from "../../models/Review";
import { User } from "../../models/User";

export const dummyPlace: autoCompletePlace = {
  place_id: '1',
  name: 'Test Place',
  vicinity: '123 Main St',
  formatted_phone_number: '(123) 456-7890',
  photos: [
    {
      height: 64,
      width: 64,
      html_attributions: ['place', 'holder', 'values'],
      getUrl: (opts: any) => 'google-places-image-url',
    }
  ]
};

export const dummyUser: User = {
  userName: 'tester',
  email: 'tester@test.com',
  token: 'abc123'
};

export const dummyReviewOne: Review = {
  placeId: 'p123',
  userName: 'user1',
  placeName: 'Dummy Place',
  burger: 5,
  bloody: 4,
  words: 'Review 1',
  reviewDate: '2023-01-15T00:00:00'
};

export const dummyReviewTwo: Review = {
  placeId: 'p124',
  userName: 'user2',
  placeName: 'Dummy Place',
  burger: 3,
  bloody: 2,
  words: 'Review 2',
  reviewDate: '2023-02-10T00:00:00'
};

export const dummyReviewThree: Review = {
  placeId: 'p125',
  userName: 'user3',
  placeName: 'Dummy Place',
  burger: null,
  bloody: 3,
  words: 'Review 3',
  reviewDate: '2023-01-20T00:00:00'
};