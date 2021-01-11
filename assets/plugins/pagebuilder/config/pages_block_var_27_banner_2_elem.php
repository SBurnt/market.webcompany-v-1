<?php

return [
    'title' => 'Баннеры. 2 элемента в строке (29)',

    'show_in_templates' => [5],

//        'show_in_docs' => [ 2 ],

//        'hide_in_docs' => [ 10, 63 ],

    'order' => 30,

    'container' => ['tabs', 'default'],

    'templates' => [
        'owner' => '
			<section class="services [+background+]">
				<div class="container">
					<p class="services__text">[+before_text+]</p>
					<ul class="services__list one-line-el">
						[+links_block+]
					</ul>
				</div>
			</section>
            ',
		'links_block' => '
			<li class="services__item [+big_image_class_lb+]"><img class="services__item__img" src="[+image_lb+]" alt="[+link_title_lb+]" loading="lazy"><a class="services__item__wrap no_background" href="[+link_url_lb+]">
	<div class="services__item__info">
		<h3 class="services__item__title">[+link_title_lb+]</h3><span class="services__item__text">[+link_after_text_lb+]</span>
	</div></a></li>
		'
    ],

    'fields' => [
        'background' => [
            'caption' => 'Серый фон',
            'type' => 'checkbox',
            'elements' => ['gray-bg' => 'Да'],
            'default' => ''
        ],
        'before_text' => [
            'caption' => 'Текст до ссылок',
            'type' => 'textarea',
            'default' => '',
            'height' => '300px',
        ],
		'links_block' => [
            'caption' => 'Ссылки с изображениями',
            'type' => 'group',
            'fields' => [
                'image_lb' => [
					'caption' => 'Изображение для ссылки 595x235 или 293х235',
					'type'    => 'image',
				],

                'link_url_lb' => [
                    'caption' => 'Ссылка или id страницы в теге id',
                    'type' => 'text',
                ],
				'link_title_lb' => [
					'caption' => 'Текст для ссылки (верхний)',
					'type' => 'text',
				],
				'link_after_text_lb' => [
					'caption' => 'Текст после ссылки (нижний)',
					'type' => 'text',
				],
				'big_image_class_lb' => [
					'caption'  => 'Большое изображение',
					'type'     => 'checkbox',
					'layout'   => 'horizontal',
					'elements' => [
						'services__item_big' => 'Да',
					],
					'default' => [],
				],
            ],
        ],
    ],
];

