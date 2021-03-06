<?php

class GroupingTest extends PHPUnit_Framework_TestCase {

	/**
	 * @covers MC4WP_MailChimp_Merge_Var::__construct
	 */
	public function test_constructor() {

		$name = 'My Grouping';
		$field_type = 'dropdown';
		$id = 'my-grouping-id';

		$instance = new MC4WP_MailChimp_Grouping( $id, $name, $field_type );
		self::assertAttributeEquals( $name, 'name', $instance );
		self::assertAttributeEquals( $field_type, 'field_type', $instance );
		self::assertAttributeEquals( $id, 'id', $instance );
	}

}