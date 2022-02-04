import AbstractView from './abstract-view';

const createEmptyPointListTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class EmptyPointListView extends AbstractView {
  get template() {
    return createEmptyPointListTemplate();
  }
}
