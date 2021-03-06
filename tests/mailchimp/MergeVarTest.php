<?php

class MergeVarTest extends PHPUnit_Framework_TestCase {

	/**
	 * @covers MC4WP_MailChimp_Merge_Var::__construct
	 */
	public function test_constructor() {

		$field_name = 'Email Address';
		$field_type = 'email';
		$field_tag = 'MMERGE1';

		$instance = new MC4WP_MailChimp_Merge_Var( $field_name, $field_type, $field_tag );
		self::assertAttributeEquals( $field_name, 'name', $instance );
		self::assertAttributeEquals( $field_type, 'field_type', $instance );
		self::assertAttributeEquals( $field_tag, 'tag', $instance );

	}

}