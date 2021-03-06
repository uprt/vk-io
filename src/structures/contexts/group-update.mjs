import Context from './context';

import { PhotoAttachment } from '../attachments';

export default class GroupUpdateContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 * @param {Object} options
	 */
	constructor(vk, payload, { updateType, groupId }) {
		super(vk);

		this.payload = payload;
		this.$groupId = groupId;

		const isChangePhoto = updateType === 'group_change_photo';

		this.attachments = isChangePhoto
			? [new PhotoAttachment(payload.photo, vk)]
			: [];

		this.type = 'group_update';
		this.subTypes = [
			// eslint-disable-next-line no-nested-ternary
			updateType === 'group_change_settings'
				? 'group_update_settings'
				: isChangePhoto
					? 'group_update_photo'
					: 'group_update_officers'
		];
	}

	/**
	 * Checks is change photo
	 *
	 * @return {boolean}
	 */
	get isChangePhoto() {
		return this.subTypes.includes('group_change_photo');
	}

	/**
	 * Checks is change officers
	 *
	 * @return {boolean}
	 */
	get isChangeOfficers() {
		return this.subTypes.includes('group_change_officers');
	}

	/**
	 * Checks is change settings
	 *
	 * @return {boolean}
	 */
	get isChangeSettings() {
		return this.subTypes.includes('group_change_settings');
	}

	/**
	 * Checks for the presence of attachments
	 *
	 * @param {?string} type
	 *
	 * @return {boolean}
	 */
	hasAttachments(type = null) {
		if (type === null) {
			return this.attachments.length > 0;
		}

		return this.attachments.some(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns the identifier admin
	 *
	 * @return {?number}
	 */
	get adminId() {
		return this.payload.admin_id;
	}

	/**
	 * Returns the identifier user
	 *
	 * @return {number}
	 */
	get userId() {
		return this.payload.user_id;
	}

	/**
	 * Returns the old level permission
	 *
	 * @return {?number}
	 */
	get oldLevel() {
		return this.payload.level_old || null;
	}

	/**
	 * Returns the new level permission
	 *
	 * @return {?number}
	 */
	get newLevel() {
		return this.payload.level_new || null;
	}

	/**
	 * Returns the changes settings
	 *
	 * @return {?Object}
	 */
	get changes() {
		return this.payload.changes || null;
	}

	/**
	 * Returns the attachments
	 *
	 * @param {?string} type
	 *
	 * @return {Array}
	 */
	getAttachments(type = null) {
		if (type === null) {
			return this.attachments;
		}

		return this.attachments.filter(attachment => (
			attachment.type === type
		));
	}
}
