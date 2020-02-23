<?php
/**
 * Plugin Name: SukaBerg
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: SukaBerg 是一个整合了一些 Sukazyo Workshop 中经常会用到的区块的 Gutenberg 扩展包
 * Author: Cookie Sukazyo Eyre
 * Author URI: https://sukazyo.cc/
 * Version: 1.0.1
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
