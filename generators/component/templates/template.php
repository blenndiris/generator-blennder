<?php if ( can_render_component( $fields ) ): ?>

<section <?php echo component_attributes( $fields ); ?> >
    <div class="container">
        <h1><%= label %></h1>
    </div><!-- /.container -->
</section><!-- /#section -->

<?php endif; ?>
