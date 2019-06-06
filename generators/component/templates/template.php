<?php if ( can_render_component( $fields ) ): ?>

<section <?php echo component_attributes( $fields ); ?> >

	<?php if(!empty($fields['settings_anchor_selector'])): ?>
	<a id="<?php echo $fields['settings_anchor_selector'];?>" class="anchor"></a>
	<?php endif; ?>

	<div class="container">

		<?php component_header( $fields ); ?>

		<!-- Component Template -->
		<h1><%= label %></h1>

	</div><!-- /.container -->
</section><!-- /#section -->

<?php endif; ?>
