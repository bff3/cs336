# cs336
Project proposal
I may like to work with Sean Jacobsma
Flashcards that can be arranged in a graph type stucture.
The application would allow you to create sets of flashcards.
There will be two modes: edit and read which will be selected by a button.
In edit mode, all the flash cards will be displayed.
The user will be able to enter a topic into a form and the definition
in another form. There will be a third form to enter in an existing topic to link the
new topic to. 
In read mode, only one topic will be displayed. When the user clicks on the topic,
the answer will be displayed next to it along with references to the linked topics.
A button, when clicked, will display the next card.
A hamburger menue will let you select which flashcard set you are editing or reading. The menu will
also let you create a new set.

set of all collections = [
	List of cards = [
		card = {concept: definition,
			related_concept: [list of concepts]}]
]
