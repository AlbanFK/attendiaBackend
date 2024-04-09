/**
 * Describes the minimal set of data each entity in the system
 * @author Alban Foko <fokoalban3@gmail.com>
 */
export interface BaseData {
  /**
   * The unique identifier for the entity. This value should
   * be always set.
   * @type {string}
   */
  _id: string;

  /**
   * The creation date of the entity. This value should
   * be always set.
   * @type {string}
   */
  createdAt: string;

  /**
   * The last time this entity got updated. This value should
   * be always set.
   * @type {string}
   */
  updatedAt: string;
}
