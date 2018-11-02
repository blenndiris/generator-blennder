<?php if ( can_render_component( $fields ) ): ?>

<section <?php echo component_attributes( $fields ); ?> >
    <div class="container">
        <div class="row">
            <div class="col">
                <h1><%= label %></h1>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container -->
</section><!-- /#section -->

<?php endif; ?>
