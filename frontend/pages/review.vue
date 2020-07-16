<template>
  <v-layout
    column
  >
    <h1>Create a post</h1>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card ref="form">
          <v-card-text>
            <v-text-field
              ref="name"
              label="Name of the restaurant, shop, food vendor, etc."
              placeholder="Sushi Saiko"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-textarea
              outlined
              name="review"
              label="Write a review"
              placeholder="Fresh, delicious sushi to go..."
            ></v-textarea>
          </v-card-text>
          <v-card-text>
            <v-text-field
              ref="url"
              label="URL"
              placeholder="https://"
            ></v-text-field>
          </v-card-text>
          <v-btn>Submit</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<!--
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            -->
