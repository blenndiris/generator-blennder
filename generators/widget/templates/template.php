<?php if ( can_render_widget( $fields ) ): ?>

	<section <?php echo component_attributes( $fields ); ?> >
		<h1><%= label %></h1>
	</section>

<?php endif; ?>
