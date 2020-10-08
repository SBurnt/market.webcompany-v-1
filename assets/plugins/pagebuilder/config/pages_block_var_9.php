<?php

return [
    'title' => 'Вид 11 - Услуги/Товары/Проекты/Статьи/Новости (11)',

    'show_in_templates' => [5],

//        'show_in_docs' => [ 2 ],

//        'hide_in_docs' => [ 10, 63 ],

    'order' => 11,

    'container' => ['tabs', 'default'],

    'templates' => [
        'owner' => '
			<section class="services [+background+]">
              <div class="container">
                <div class="services-ten">
                  <div class="services-ten__tabs">
                    <h2 class="title">[+title+]</h2>
                    <ul class="services-ten__tabs__navs">
                      [+navigate+]
                    </ul><a class="services-ten__tabs__all" href="[+link_url+]">[+link_title+]</a>
                  </div>
                  <div class="services-ten__tabs-content">
                    <div class="services-ten__navs">
                      <div class="services-ten__nav-prev services-ten__nav" switch-tab="prev">
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.08333 8.75L3.25 5L7.08333 1.16667L5.91666 0L0.916662 5L5.91666 10L7.08333 8.75Z"></path>
                        </svg>
                      </div>
                      <div class="services-ten__nav__next services-ten__nav" switch-tab="next">
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.916672 8.75L4.75 5L0.916672 1.16667L2.08334 0L7.08334 5L2.08334 10L0.916672 8.75Z"></path>
                        </svg>
                      </div>
                    </div>
                    [+links_block+]
                  </div>
                </div>
              </div>
            </section>
            ',
        'links_block' => '
		  <div class="services-ten__tabs__item [+active+]" data-id="tab[+links_block_iteration+]"><img src="[+image_lb+]" alt="[+header_lb+]" loading="lazy">
              <div class="services-ten__tabs__item__wrap"><a class="services-ten__tabs__title" href="[+link_url_lb+]">[+header_lb+]</a>
				<div class="services-ten__tabs__text">
					[+group_title_lb+]
				</div>
				[[if? &is=`[+add_children_lb+]:=:1` &then=`[[DLMenu? &parents=`[+parent_id_lb+]` &maxDepth=`1` &filters=`` &outerClass=`services-ten__tabs__list`]]` &else=``]]
              <a class="services-ten__tabs__more" href="[+link_url_lb+]">[+link_title_lb+]
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.35355 4.35355C9.54882 4.15829 9.54882 3.84171 9.35355 3.64645L6.17157 0.464466C5.97631 0.269204 5.65973 0.269204 5.46447 0.464466C5.2692 0.659728 5.2692 0.976311 5.46447 1.17157L8.29289 4L5.46447 6.82843C5.2692 7.02369 5.2692 7.34027 5.46447 7.53553C5.65973 7.7308 5.97631 7.7308 6.17157 7.53553L9.35355 4.35355ZM0 4.5H9V3.5H0V4.5Z"></path>
                      </svg></a>
                       </div>
            </div>
		'
    ],

    'fields' => [
        'title' => [
            'caption' => 'Заголовок',
            'type' => 'text',
        ],
        'background' => [
            'caption' => 'Серый фон',
            'type' => 'checkbox',
            'elements' => ['gray-bg' => 'Да'],
            'default' => ''
        ],
        'link_title' => [
            'caption' => 'Текст для общей ссылки',
            'type' => 'text',
        ],
        'link_url' => [
            'caption' => 'Ссылка или id страницы в теге id',
            'type' => 'text',
        ],

        'links_block' => [
            'caption' => 'Ссылки с изображениями',
            'type' => 'group',
            'fields' => [
                'image_lb' => [
                    'caption' => 'Изображение для ссылки 175x117 px',
                    'type' => 'image',
                ],

                'header_lb' => [
                    'caption' => 'Заголовок блока',
                    'type' => 'text',
                ],

                'group_title_lb' => [
                    'caption' => 'Текст под ссылкой',
                    'type' => 'richtext',
                    'default' => '',
                    'theme' => 'modern',
                    'options' => [
                        'height' => '300px',
                    ],
                ],

                'link_url_lb' => [
                    'caption' => 'Ссылка или id страницы в теге id',
                    'type' => 'text',
                ],
                'link_title_lb' => [
                    'caption' => 'Текст для ссылки',
                    'type' => 'text',
                ],
                'add_children_lb' => [
                    'caption' => 'Выводить ссылки на дочерние ресурсы',
                    'type' => 'checkbox',
                    'elements' => ['1' => 'Да'],
                    'default' => ''
                ],
                'parent_id_lb' => [
                    'caption' => 'id родительского ресурса для вывода подуровней',
                    'type' => 'text',
                ],
            ],
        ],
    ],
    'prepare' => function ($options, &$values) {
        $i = 1;
        $values['navigate'] = '';
        if(is_array($values['links_block']) && !empty($values['links_block'])) {
            foreach ($values['links_block'] as &$links_block) {
                $links_block['active'] = '';
                $is_active = '';
                if ($i == 1) {
                    $links_block['active'] = 'active';
                    $is_active = 'active';
                }
                $values['navigate'] .= "<li class=\"services-ten__tabs__switch {$is_active}\"><a data-tab=\"tab{$i}\">{$links_block['header_lb']}</a></li>";
                $i++;
            }
        }
        unset($links_block, $is_active);
    }
];

